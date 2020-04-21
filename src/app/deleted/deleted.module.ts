import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletedComponent } from './deleted.component';
import { RouterModule } from '@angular/router';
import { UsersModule } from '../shared/users.module';

@NgModule({
  declarations: [DeletedComponent],
  imports: [
    CommonModule,
    UsersModule,
    RouterModule.forChild([{ path: '', component: DeletedComponent }]),
  ],
})
export class DeletedModule {}
