import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";
import { CardAllUsersComponent } from "./components/card-all-users/card-all-users.component";
import { CardAllAddressComponent } from "./components/card-all-address/card-all-address.component";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SideBarComponent,
    CardAllUsersComponent,
    CardAllAddressComponent,
    RouterModule
]
})
export class DashboardModule { }
