import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserNamePipe } from './pipes/user-name.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [UserListComponent, UserComponent, UserNamePipe],
  exports: [UserListComponent, UserComponent, UserNamePipe],
})
export class UsersModule {}
