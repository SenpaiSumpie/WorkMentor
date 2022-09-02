import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Connection } from '../classes/connection';

import { ConnectionServiceService } from './connection-service.service';

describe('ConnectionServiceService', () => {
  let service: ConnectionServiceService;
  let connection : Connection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConnectionServiceService],
  });
    service = TestBed.inject(ConnectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should find all', () => {
    service.findAll().subscribe( result => {
      expect(result.length).toBeGreaterThan(0);
    });
  });

  it('should get', () => {
    service.get(1).subscribe( result => {
      expect(result).toBeTruthy();
    });
  });

  it('should save', () => {
    service.save(connection).subscribe( result => {
      expect(result).toBeTruthy();
    });
  });

  it('should update', () => {
    service.update(connection).subscribe( result => {
      expect( result ).toBeTruthy();
    });
  });
});
