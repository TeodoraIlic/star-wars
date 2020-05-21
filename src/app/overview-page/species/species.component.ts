import { Component, OnInit, OnDestroy } from '@angular/core';
import { Specimen } from './species.model';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { SpeciesService } from 'src/app/service/species.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit, OnDestroy {
  isLoading = true;
  viewAll: boolean = true;
  idList: string[];
  speciesUrl: string; 
  listOfSpeciesToView = [];
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  species: Specimen[];
  speciesSub: Subscription;
  specimen: Specimen;
  specimenSub: Subscription;
  constructor(private categoriesService: CategoriesService, 
              private speciesService: SpeciesService, 
              private fuzzySearchService: FuzzySearchService,
              private router: Router,
              private route: ActivatedRoute) {
                if(this.router.getCurrentNavigation()){
                  this.idList =  this.router.getCurrentNavigation().extras.state.species;
  
                 }
               }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('related')){
          this.viewAll = false ;
          this.getRelatedSpecies(this.idList); 
      }
    });
    this.speciesService.getSpecimenList();
    this.specimenSub = this.speciesService.getSpecimenUpdateListener().subscribe(species =>{
      this.listOfSpeciesToView = species;
    })

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
  getRelatedSpecies(idList: string[]){
    idList.map( id =>{
      this.speciesService.getSpecimen(id);
    });
  }
}
