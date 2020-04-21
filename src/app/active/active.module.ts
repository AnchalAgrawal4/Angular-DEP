import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveComponent } from './active.component';
import { RouterModule } from '@angular/router';
import { UsersModule } from '../shared/users.module';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    RouterModule.forChild([{ path: '', component: ActiveComponent }]),
  ],
  declarations: [ActiveComponent]
})
export class ActiveModule {}
