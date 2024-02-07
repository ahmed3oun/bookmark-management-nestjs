import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBookmarkPageRoutingModule } from './create-bookmark-routing.module';

import { CreateBookmarkPage } from './create-bookmark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBookmarkPageRoutingModule
  ],
  declarations: [CreateBookmarkPage]
})
export class CreateBookmarkPageModule {}
