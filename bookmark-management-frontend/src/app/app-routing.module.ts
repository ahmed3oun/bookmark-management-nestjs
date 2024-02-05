import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: window.localStorage.getItem('token') ? 'bookmarks' : 'login',
    pathMatch: 'full',
  },
  {
    path: 'bookmarks',
    loadChildren: () =>
      import('./pages/bookmarks/bookmarks.module').then(
        (m) => m.BookmarksPageModule,
      ),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule,
      ),
    canActivate: [IsLoggedOutGuard],
  },
  {
    path: '**',
    redirectTo: window.localStorage.getItem('token') ? 'bookmarks' : 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
