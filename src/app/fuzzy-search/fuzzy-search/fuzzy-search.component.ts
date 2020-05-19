import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css']
})
export class FuzzySearchComponent implements OnInit {
  values: string = '';
  form: FormGroup;
  constructor(private search: FuzzySearchService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'content': new FormControl(null, {  validators: [Validators.required] })
  });
    
  }
 
  onKeyup(value: string){
    this.values = value;
    this.search.updateValue(value);
  }
}
