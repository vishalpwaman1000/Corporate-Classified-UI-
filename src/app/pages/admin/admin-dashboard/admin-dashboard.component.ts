import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  

  constructor(
    private product: ProductService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }
  
  
  
}
