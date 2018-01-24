import { TestBed, inject } from '@angular/core/testing';

import { BoardService } from './board.service';

describe('CardActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardService]
    });
  });

  it('should be created', inject([BoardService], (service:BoardService) => {
    expect(service).toBeTruthy();
  }));
});
