import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuzzySearchService {
  freshData: string;
  private items: any;
  private itemsUpdated = new Subject<any>();
  constructor() { }


  loadDataFromComponent(items: any){
    this.items = items;
  }
  itemsUpdateListener(){
    return this.itemsUpdated.asObservable();
  }

  refreshSearch(input: string){
    this.freshData = input;
    var results = [];
    this.items.map(el =>{
      var result = this.fuzzy_match(el.title, input);
      if(result){
        results.push(el);
      }
    });
    console.log(results);
    //treba da emituje nazad u komponentu
    this.itemsUpdated.next(results);
  }

  fuzzy_match(text, search){
    var search = search.replace(/\ /g, '').toLowerCase();
    var tokens = [];
    var search_position = 0;

    
    for (var n=0; n<text.length; n++){
        var text_char = text[n];
    
        if(search_position < search.length &&
          text_char.toLowerCase() == search[search_position])
        {
            text_char = '<b>' + text_char + '</b>';
            search_position += 1;
        }
        tokens.push(text_char);
    }
   
    if (search_position != search.length)
    {
        return '';
    }
    return tokens.join('');
}
}
