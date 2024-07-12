import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { RcaDemoComponent } from './rca-demo/rca-demo.component';
import { UpdateDemoComponent } from './update-demo/update-demo.component';
import { NbStepperModule } from '@nebular/theme';


@NgModule({
  declarations: [
    RcaDemoComponent,
    UpdateDemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    NbStepperModule,
  ]
})
export class DemoModule { }
