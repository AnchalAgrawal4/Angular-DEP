import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { UserActionService } from 'src/app/shared/user-actions.service';
import { CreateFormComponent } from './create-form.component';
describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;
  beforeEach(() => {
    const userServiceStub = () => ({
      createUser: payload => ({ subscribe: f => f({}) })
    });
    const userActionServiceStub = () => ({ onUserAction: object => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateFormComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: UserActionService, useFactory: userActionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('createUser', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      const userActionServiceStub: UserActionService = fixture.debugElement.injector.get(
        UserActionService
      );
      spyOn(userServiceStub, 'createUser').and.callThrough();
      spyOn(userActionServiceStub, 'onUserAction').and.callThrough();
      component.createUser();
      expect(userServiceStub.createUser).toHaveBeenCalled();
      expect(userActionServiceStub.onUserAction).toHaveBeenCalled();
    });
  });
});
