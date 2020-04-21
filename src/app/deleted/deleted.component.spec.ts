import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { UserActionService } from '../shared/user-actions.service';
import { DeletedComponent } from './deleted.component';
describe('DeletedComponent', () => {
  let component: DeletedComponent;
  let fixture: ComponentFixture<DeletedComponent>;
  beforeEach(() => {
    const userServiceStub = () => ({
      getDeletedUsers: () => ({ subscribe: f => f({}) }),
      activateUser: id => ({ subscribe: f => f({}) })
    });
    const userActionServiceStub = () => ({
      userAction$: { subscribe: f => f({}) }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DeletedComponent],
      providers: [
        { provide: UserService, useFactory: userServiceStub },
        { provide: UserActionService, useFactory: userActionServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DeletedComponent);
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
      spyOn(component, 'loadDeletedUsers').and.callThrough();
      spyOn(component, 'activateUser').and.callThrough();
      component.ngOnInit();
      expect(component.loadDeletedUsers).toHaveBeenCalled();
      expect(component.activateUser).toHaveBeenCalled();
    });
  });
  describe('loadDeletedUsers', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getDeletedUsers').and.callThrough();
      component.loadDeletedUsers();
      expect(userServiceStub.getDeletedUsers).toHaveBeenCalled();
    });
  });
});
