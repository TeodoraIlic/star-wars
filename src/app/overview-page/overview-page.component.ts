import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Subscription } from 'rxjs';
import { Categories } from './categories.model';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
 
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
