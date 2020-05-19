import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuzzySearch'
})
export class FuzzySearchPipe implements PipeTransform {

  transform(items: any[], fields: string[], searchText: string): any[] {
    
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item=> {    
      var itemFound: Boolean = false;
      for (let i = 0; i < fields.length; i++) {
        if (item[fields[i]].toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });

   
   }

}
