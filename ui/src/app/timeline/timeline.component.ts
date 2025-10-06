import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { NgxTimelineComponent, TimelineEntry } from '@omnedia/ngx-timeline';

@Component({
  selector: 'jdm-timeline',
  imports: [RouterLink, FormsModule, NgxTimelineComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  providers: [ChatService],
})
export class TimelineComponent {
  timelineData: TimelineEntry[] = [
    {
      title: `<h1 class="jdm-timeline">2025</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2024</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2023</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2022</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2021</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2020</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2019</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
    {
      title: `<h1 class="jdm-timeline">2018</h1>`,
      content: `<p class="jdm-timeline__description">Diseñé e implementé un flujo de ambientes efímeros por feature branch usando Azure DevOps y OpenShift. Cada rama despliega automáticamente su propio namespace y base de datos, aplicando migraciones de esquema sin afectar a otros entornos. Esto permitió a QA y negocio validar nuevas funcionalidades en ambientes aislados y con URLs únicas, optimizando el ciclo de pruebas y la integración continua.</p>`,
    },
  ];
}
