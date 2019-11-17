import { async, TestBed } from '@angular/core/testing';
import { NanuxStore } from './nanux-store.module';

describe('StoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NanuxStore]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NanuxStore).toBeDefined();
  });
});
