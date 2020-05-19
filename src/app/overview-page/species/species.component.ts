import { Component, OnInit, OnDestroy } from '@angular/core';
import { Specimen } from './species.model';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { SpeciesService } from 'src/app/service/species.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit, OnDestroy {
  isLoading = true;
  speciesUrl: string; 
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  species: Specimen[];
  speciesSub: Subscription;
  specimen: Specimen;
  specimenSub: Subscription;
  constructor(private categoriesService: CategoriesService, private speciesService: SpeciesService, private fuzzySearchService: FuzzySearchService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.speciesUrl = categories.species;
      this.getSpecies(this.speciesUrl);
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })
  }

  ngOnDestroy(){
    this.speciesSub.unsubscribe();
    this.categoriesSub.unsubscribe();
  }

  getSpecies(url: string){
    this.speciesService.getSpecies(url);
    this.speciesSub = this.speciesService.getSpeciesUpdateListener().subscribe((species)=>{
      this.species = species;
    });
  }
}
