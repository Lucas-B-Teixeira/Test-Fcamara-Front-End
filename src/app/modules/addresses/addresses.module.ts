import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesRoutingModule } from './addresses-routing.module';
import { StripComponent } from './components/strip/strip.component';
import { HomeComponent } from './components/_home/home.component';
import { PopUpEditComponent } from './components/pop-up-edit/pop-up-edit.component';
import { PopUpNewComponent } from "./components/pop-up-new/pop-up-new.component";
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    StripComponent,
    HomeComponent,
    PopUpEditComponent
  ],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    PopUpNewComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
]
})
export class AddressesModule { }
