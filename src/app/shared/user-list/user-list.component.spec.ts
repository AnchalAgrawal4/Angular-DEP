import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User, UserService } from 'src/app/user.service';
import { UserListComponent } from './user-list.component';
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  beforeEach(() => {
    const userStub = () => ({ id: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserListComponent],
      providers: [{ useFactory: userStub }],
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
