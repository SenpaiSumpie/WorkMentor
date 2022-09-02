import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../classes/user';

import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  let service: UserServiceService;
  let user = {} as User;
  let userService: jasmine.SpyObj<UserServiceService>;

  beforeEach(() => {
    userService = jasmine.createSpyObj(['findAll', 'get', 'update', 'save']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserServiceService],
    });
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should findAll', () => {
    service.findAll().subscribe((result) => {
      expect(result.length).toBe(0);
    });
  });

  it('should get', () => {
    service.get(1).subscribe((result) => {
      expect(result).toBeTruthy();
    });
  });

  it('should save', () => {
    service.save(user).subscribe((result) => {
      expect(result.id).toBe(user.id);
    });
  });

  it('should update', () => {
    service.update(user).subscribe((result) => {
      expect(result.id).toBe(user.id);
    });
  });
});
