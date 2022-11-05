import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor() {
  }


  start() {
    this.loading$.next(true);
  }

  complete() {
    this.loading$.next(false);
  }
}
