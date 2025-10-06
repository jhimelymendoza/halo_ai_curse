import { Injectable, NotFoundException } from '@nestjs/common';
import { Chat, Content, GoogleGenAI } from '@google/genai';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Project } from './project/project.schema';
import { Skills } from './project/skills.schema';
import cosineSimilarity from 'compute-cosine-similarity';
import {
  getInstructions, getIsSkillQuestionPrompt,
  getSkillComparisonIntentPrompt,
} from './default_prompts/default.prompts';

const MODEL = 'gemini-2.0-flash-001';
const EMBEDDING_MODEL = 'gemini-embedding-001';
const TEMPERATURE = 0.5;

@Injectable()
export class AppService {
  history: Content[] = [];
  skillSimilarity: string[] = [];
  constructor(
    private googleGenAI: GoogleGenAI,
    @InjectConnection() private connection: Connection,
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Skills.name) private skillsModel: Model<Skills>,
  ) {}

  async onModuleInit() {
    const isConnected = this.connection.readyState === 1;
    console.log(
      `MongoDB connection started: ${isConnected ? 'Connected' : 'Not Connected'}`,
    );
  }

  async ask(prompt: string): Promise<IChat> {
    const project = await this.projectModel.find().exec();

    const chat = {
      role: 'user',
      parts: [{ text: prompt }],
    };

    const isSkillQuery = await this.isSkillComparison(prompt);
    let skillsResult: { skill: string; similarity: number }[] | undefined;

    if (isSkillQuery) {
      skillsResult = await this.compare(prompt);
    }

    this.history = [...this.history, chat];

    const chatAi = this.googleGenAI.chats.create({
      model: MODEL,
      history: this.history,
      config: {
        systemInstruction: getInstructions({ projects: project }),
        temperature: TEMPERATURE,
      },
    });
    if (isSkillQuery) {
      const response = await this.simpleQuestion(
        chatAi,
        getIsSkillQuestionPrompt(prompt, skillsResult),
      );

      return {
        isSkillQuery: isSkillQuery,
        skills: skillsResult,
        answer: response.text ?? 'no tengo respuesta',
      };
    }
    const response = await this.simpleQuestion(chatAi, prompt);
    return {
      isSkillQuery: isSkillQuery,
      skills: skillsResult,
      answer: response.text ?? 'no tengo respuesta',
    };
  }

  private async simpleQuestion(chatAi: Chat, prompt: string) {
    const response = await chatAi.sendMessage({
      message: prompt,
    });

    const aIResponse = {
      role: 'model',
      parts: [{ text: response.text ?? 'no tengo respuesta' }],
    };
    this.history = [...this.history, aIResponse];
    return response;
  }

  async setEmbeddingsByProjectId(id: string) {
    let skill = await this.skillsModel.findById({ _id: id }).exec();

    if (!skill) {
      throw new NotFoundException(`Skill with id "${id}" not found`);
    }

    const response = await this.googleGenAI.models.embedContent({
      model: 'gemini-embedding-001',
      contents: skill!.name,
      config: {
        outputDimensionality: 768,
      },
    });

    if (response.embeddings && response.embeddings!.length > 0) {
      if (!skill) {
        throw new NotFoundException(
          `We were not able to generate embeddings for the skill with id "${id}"`,
        );
      }
    }

    skill = await this.skillsModel
      .findByIdAndUpdate(
        id,
        { embeddings: response.embeddings![0].values },
        { new: true },
      )
      .exec();
    return { id: skill!._id, name: skill!.name, embeddings: skill!.embeddings };
  }

  async compare(
    text: string,
  ): Promise<{ skill: string; similarity: number }[]> {
    const questionEmbedding = await this.getEmbedding(text);
    const skills = await this.skillsModel.find().exec();

    const result = skills.map((skill) => ({
      skill: skill.name,
      similarity: cosineSimilarity(questionEmbedding!, skill.embeddings)!,
    }));

    return result.sort((a, b) => b.similarity! - a.similarity!);
  }

  async getEmbedding(text: string) {
    const response = await this.googleGenAI.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: text,
      config: {
        outputDimensionality: 768,
      },
    });

    return response.embeddings![0].values;
  }

  private async isSkillComparison(prompt: string): Promise<boolean> {
    const chatAi = this.googleGenAI.chats.create({
      model: MODEL,
      history: [
        {
          role: 'model',
          parts: [
            {
              text: getSkillComparisonIntentPrompt(prompt),
            },
          ],
        },
      ],
      config: {
        temperature: 0,
      },
    });

    const response = await chatAi.sendMessage({ message: prompt });
    const text = response.text?.toLowerCase() ?? '';

    return /sí|si/.test(text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  }
}
