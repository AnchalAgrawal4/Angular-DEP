import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { UserActionService } from '../shared/user-actions.service';
import { ActiveComponent } from './active.component';
describe('ActiveComponent', () => {
  let component: ActiveComponent;
  let fixture: ComponentFixture<ActiveComponent>;
  beforeEach(() => {
    const userServiceStub = () => ({
      getActiveUsers: () => ({ subscribe: f => f({}) }),
      deActivateUser: id => ({ subscribe: f => f({}) })
    });
    const userActionServiceStub = () => ({
      userAction$: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActiveComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: UserActionService, useFactory: userActionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ActiveComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('userList defaults to: []', () => {
    expect(component.userList).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadActiveUsers').and.callThrough();
      spyOn(component, 'deActivateUser').and.callThrough();
      component.ngOnInit();
      expect(component.loadActiveUsers).toHaveBeenCalled();
      expect(component.deActivateUser).toHaveBeenCalled();
    });
  });
  describe('loadActiveUsers', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getActiveUsers').and.callThrough();
      component.loadActiveUsers();
      expect(userServiceStub.getActiveUsers).toHaveBeenCalled();
    });
  });
});
