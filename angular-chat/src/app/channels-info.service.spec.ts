import { TestBed } from '@angular/core/testing';

import { ChannelsInfoService } from './channels-info.service';

describe('ChannelsInfoService', () => {
  let service: ChannelsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
