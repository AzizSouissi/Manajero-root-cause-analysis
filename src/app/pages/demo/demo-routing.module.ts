import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RcaDemoComponent } from './rca-demo/rca-demo.component';
import { UpdateDemoComponent } from './update-demo/update-demo.component';
import { CommentsComponent } from './comments/comments.component';
import { ResultsChartComponent } from './results-chart/results-chart.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path:'',component:RcaDemoComponent},
  {path:'edit',component:UpdateDemoComponent},
  {path:'c',component:CommentsComponent},
  {path:'results',component:ResultsChartComponent},
  {path:'quiz',component:QuizComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
