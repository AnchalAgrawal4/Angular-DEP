import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UsersModule } from '../shared/users.module';

const manageRoutes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    children: [
      { path: 'create', component: CreateFormComponent },
      { path: ':id', component: UserDetailsComponent },
      { path: 'edit/:id', component: EditFormComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserDetailsComponent,
    CreateFormComponent,
    EditFormComponent,
    ManageUsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersModule,
    RouterModule.forChild(manageRoutes),
    ReactiveFormsModule,
  ],
  exports: [UserDetailsComponent, ReactiveFormsModule],
})
export class ManageModule {}
