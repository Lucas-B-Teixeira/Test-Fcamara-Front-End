import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SideBarComponent
]
})
export class DashboardModule { }
