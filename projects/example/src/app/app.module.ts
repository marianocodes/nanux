import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NanuxStore } from '@nanux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { reducer } from './reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    NanuxStore.forRoot({
      reducerMap: {counter: reducer},
      debugMode: true,
      // decorators: true
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
