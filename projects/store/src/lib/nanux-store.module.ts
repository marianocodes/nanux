import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreConfig } from './models/config.model';
import { CONFIG_TOKEN } from './utils/tokens';

@NgModule({
  imports: []
})
export class NanuxStore {
  public static forRoot(config?: StoreConfig): ModuleWithProviders<NanuxStore> {
    return {
      ngModule: NanuxStore,
      providers: [{ provide: CONFIG_TOKEN, useValue: config }]
    };
  }
}
