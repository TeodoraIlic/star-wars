import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuzzySearchService {
  
  valuesUpdated = new Subject<string>();

  constructor() { }
  valueUpdateListener(){
    return this.valuesUpdated.asObservable();
  }
  updateValue(value){
    this.valuesUpdated.next(value);
  }
}
