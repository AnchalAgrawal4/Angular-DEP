import { TestBed } from '@angular/core/testing';
import { UserActionService } from './user-actions.service';
describe('UserActionService', () => {
  let service: UserActionService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserActionService] });
    service = TestBed.get(UserActionService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
