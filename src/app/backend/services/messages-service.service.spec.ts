import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Messages } from '../classes/messages';

import { MessagesServiceService } from './messages-service.service';

describe('MessagesServiceService', () => {
  let service: MessagesServiceService;
  let messages : Messages;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessagesServiceService],
  });
    service = TestBed.inject(MessagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should findAll', () => {
    service.findAll().subscribe(result =>{
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it('should get', () => {
    service.get(1).subscribe(result =>{
      expect(result).toBeTruthy();
    });
  });

  it('should save', () => {
    service.save(messages).subscribe( result =>{
      expect(result).toBeTruthy();
    });
  });

  it('should update', () => {
    service.update(messages).subscribe(result => {
      expect(result).toBeTruthy();
    });
  });
});
