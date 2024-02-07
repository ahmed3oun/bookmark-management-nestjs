import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBookmarkPage } from './create-bookmark.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBookmarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBookmarkPageRoutingModule {}
