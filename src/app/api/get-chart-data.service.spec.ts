import { TestBed } from '@angular/core/testing';

import { GetChartDataService } from './get-chart-data.service';

describe('GetChartDataService', () => {
  let service: GetChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
