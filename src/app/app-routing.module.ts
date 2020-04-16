import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'active',
    loadChildren: () =>
      import('./active/active.module').then((file) => file.ActiveModule),
  },
  {
    path: 'deleted',
    loadChildren: () =>
      import('./deleted/deleted.module').then((file) => file.DeletedModule),
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./manage/manage.module').then((file) => file.ManageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
