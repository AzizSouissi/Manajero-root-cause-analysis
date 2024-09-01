import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';
import { RcaDemoComponent } from './rca-demo/rca-demo.component';
import { UpdateDemoComponent } from './update-demo/update-demo.component';
import { NbCardModule, NbIconModule, NbStepperModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsChartComponent } from './results-chart/results-chart.component';
import { CommentsComponent } from './comments/comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RcaComponent } from './rca/rca.component';


@NgModule({
  declarations: [
    RcaDemoComponent,
    UpdateDemoComponent,
    QuizComponent,
    ResultsChartComponent,
    CommentsComponent,
    DashboardComponent,
    RcaComponent,
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    NbStepperModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
