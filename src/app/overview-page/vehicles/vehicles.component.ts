import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { Vehicle } from './vehicles.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { VehiclesService } from 'src/app/service/vehicles.service';
import { FuzzySearchService } from 'src/app/service/fuzzy-search.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  isLoading = true;
  vehiclesUrl: string;
  viewAll: boolean = true;
  idList: string[]; 
  listOfVehiclesToView = [];
  searchValue: string = '';
  categories: Categories;
  categoriesSub: Subscription;
  vehicles: Vehicle[];
  vehiclesSub: Subscription;
  vehicle: Vehicle;
  vehicleSub: Subscription;
  constructor(private categoriesService: CategoriesService, 
              private vehiclesService: VehiclesService, 
              private fuzzySearchService: FuzzySearchService,
              private router: Router,
              private route: ActivatedRoute) {
                if(this.router.getCurrentNavigation()){
                  this.idList =  this.router.getCurrentNavigation().extras.state.vehicles;
  
                 }
               }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('related')){
          this.viewAll = false ;
          this.getRelatedVehicles(this.idList); 
      }
    });
    this.vehiclesService.getVehicleList();
    this.vehicleSub = this.vehiclesService.getVehicleUpdateListener().subscribe( vehicleList =>{
      this.listOfVehiclesToView = vehicleList;
    });

    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.vehiclesUrl = categories.vehicles;
      this.getVehicles(this.vehiclesUrl);
    });
    this.fuzzySearchService.valueUpdateListener().subscribe(value=>{
      this.searchValue=value;
    })
  }

  ngOnDestroy(){
    this.categoriesSub.unsubscribe();
    if(this.vehicleSub){
      this.vehicleSub.unsubscribe();
    }
    if(this.vehiclesSub){
    this.vehiclesSub.unsubscribe();
    }
  }
  
  getVehicles(url: string){
    this.vehiclesService.getVehicles(url);
    this.vehiclesSub = this.vehiclesService.getVehiclesUpdateListener().subscribe((starships)=>{
      this.vehicles = starships;
    });
  }
  getRelatedVehicles(idList: string[]){
    idList.map(id => {
      this.vehiclesService.getVehicle(id);
    });
  }

}
