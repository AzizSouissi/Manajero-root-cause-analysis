import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RcaDemoComponent } from './rca-demo/rca-demo.component';
import { UpdateDemoComponent } from './update-demo/update-demo.component';

const routes: Routes = [
  {path:'',component:RcaDemoComponent},
  {path:'edit',component:UpdateDemoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
