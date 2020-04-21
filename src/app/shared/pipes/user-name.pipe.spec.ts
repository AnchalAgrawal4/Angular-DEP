import { TestBed } from '@angular/core/testing';
import { User, UserService } from 'src/app/user.service';
import { UserNamePipe } from './user-name.pipe';
describe('UserNamePipe', () => {
  let pipe: UserNamePipe;
  beforeEach(() => {
    const userStub = () => ({ firstName: {}, lastName: {} });
    TestBed.configureTestingModule({
      providers: [UserNamePipe, { provide: UserService, useFactory: userStub }],
    });
    pipe = TestBed.get(UserNamePipe);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms X to Y', () => {
    const value: User = {
      firstName: 'abc',
      lastName: 'xyz',
      age: 20,
      login: 'abc',
      password: 'password123',
    };
    const args: string = 'abc xyz';
    expect(pipe.transform(value)).toEqual(args);
  });
});
