import { TestBed } from '@angular/core/testing';
import { UserService, User } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('be able to retrieve posts from the API via GET', () => {
    const mockUsers: User[] = [
      {
        id: '1',
        firstName: 'test1',
        lastName: 'test11',
        age: 1,
        login: 'test',
        password: 'test',
        isDeleted: true,
      },
      {
        id: '2',
        firstName: 'test2',
        lastName: 'test22',
        age: 2,
        login: 'test',
        password: 'test',
        isDeleted: false,
      },
    ];
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });
    const request = httpMock.expectOne(`http://localhost:8080/users`);
    expect(request.request.method).toBe('GET');
    request.flush(mockUsers);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('be able to retrieve posts from the API bia GET with given id', () => {
    const mockUser: User = {
      id: '1',
      firstName: 'test1',
      lastName: 'test11',
      age: 1,
      login: 'test',
      password: 'test',
      isDeleted: true,
    };
    service.getUserById('1').subscribe((users) => {
      expect(users).toEqual(mockUser);
    });
    const request = httpMock.expectOne(`http://localhost:8080/users/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  });
  afterEach(() => {
    httpMock.verify();
  });
});
