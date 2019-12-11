import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const mockdata = [ '🔥', '🍕', '⚡️', '🚀', '🤯'];

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  // Mimic HTTP request
  public getBestEmojis()  {
    return of(mockdata).pipe(delay(400));
  }

}
