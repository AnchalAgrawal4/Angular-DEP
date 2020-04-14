import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/user.service';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {
  transform(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }
}
