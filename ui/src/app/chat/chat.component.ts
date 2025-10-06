import {AfterViewChecked, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IChat, IHistory} from '../dto/chat.interface';
import {NgClass} from '@angular/common';
import {ChatService} from '../services/chat.service';
import {finalize, tap} from 'rxjs';

@Component({
  selector: 'jdm-chat',
  imports: [
    RouterLink,
    FormsModule,
    NgClass

  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [ChatService]
})
export class ChatComponent  implements AfterViewChecked {

  chatService=inject(ChatService)
  histories: IHistory[]=[

  ];

  question='';
  loading = false;

  @ViewChild('chatHistory') chatHistory!: ElementRef<HTMLDivElement>;


  adjustHeight(textarea: HTMLTextAreaElement): void {
    const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight || '20');
    const maxHeight = lineHeight * 8;

    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;

    if (scrollHeight <= maxHeight) {
      textarea.style.height = scrollHeight + 'px';
      textarea.style.overflowY = 'hidden';
    } else {
      textarea.style.height = maxHeight + 'px';
      textarea.style.overflowY = 'auto';
    }
  }



  send() {
    if(this.loading) return
    const savedQuestion=`${this.question}`
    this.histories=[...this.histories,{ message:this.question,bot:false,user:true}];

    setTimeout(() => {
      this.question='';
    })

    this.chatService.ask(savedQuestion).pipe(tap(()=>{
      this.loading=true;

    }),finalize(()=>{
      this.loading=false;
    })).subscribe((response:IChat)=>{
    this.histories=[...this.histories,{ message:response.answer,bot:true,user:false}];
   })

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.chatHistory?.nativeElement) {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    }
  }
}
