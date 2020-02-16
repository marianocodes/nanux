import { TestBed } from '@angular/core/testing';

import { Store } from './store.service';
import { NanuxStore } from './nanux-store.module';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NanuxStore.forRoot({
        debugMode: true,
        decorators: true
      })
    ]
  }));

  it('should be created', () => {
    const service: Store = TestBed.get(Store);
    expect(service).toBeTruthy();
  });
});
