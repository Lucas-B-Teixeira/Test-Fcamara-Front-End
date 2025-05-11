import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeComponent } from './components/home/home.component';
import { StripComponent } from './components/strip/strip.component';
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpNewComponent } from "../addresses/components/pop-up-new/pop-up-new.component";
import { PopUpEditComponent } from "./components/pop-up-edit/pop-up-edit.component";


@NgModule({
  declarations: [
    HomeComponent,
    StripComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule,
    PopUpNewComponent,
    PopUpEditComponent
]
})
export class UsersModule { }
