import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { RcaDemoComponent } from './rca-demo/rca-demo.component';
import { UpdateDemoComponent } from './update-demo/update-demo.component';
import { NbCardComponent, NbCardModule, NbIconModule, NbStepperModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RcaDemoComponent,
    UpdateDemoComponent
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
