import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from "../../shared/header/header.component";
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderComponent,
    SideBarComponent
]
})
export class HomeModule { }
