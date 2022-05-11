import { TestBed } from '@angular/core/testing';

import { MyNftService } from './my-nft.service';

describe('MyNftService', () => {
  let service: MyNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
