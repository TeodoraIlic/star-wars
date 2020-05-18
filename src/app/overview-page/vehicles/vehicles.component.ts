import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categories } from '../categories.model';
import { Vehicle } from './vehicles.model';
import { CategoriesService } from 'src/app/service/categories.service';
import { VehiclesService } from 'src/app/service/vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  isLoading = true;
  vehiclesUrl: string; 
  categories: Categories;
  categoriesSub: Subscription;
  vehicles: Vehicle[];
  vehiclesSub: Subscription;
  vehicle: Vehicle;
  vehicleSub: Subscription;
  constructor(private categoriesService: CategoriesService, private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories();
    this.categoriesSub = this.categoriesService.getCategoriesUpdateListener().subscribe((categories)=>{
      this.isLoading = false;
      this.categories = categories;
      this.vehiclesUrl = categories.vehicles;
      this.getVehicles(this.vehiclesUrl);
    });
  }

  getVehicles(url: string){
    this.vehiclesService.getVehicles(url);
    this.vehiclesSub = this.vehiclesService.getVehiclesUpdateListener().subscribe((starships)=>{
      this.vehicles = starships;
    });
    console.log(this.vehicles);
  }

}
