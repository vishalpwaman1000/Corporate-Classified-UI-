import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Route, Router } from '@angular/router';
import { UserDetailsType } from 'src/app/interfaces/user.type';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';
import { SessionService, SESSION_KEY } from 'src/app/services/storage/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: ProductDataType[] = [];
  admin:boolean=false;
  loginUser:number=0;
  userDetails: any;
  offerId: number=0;
  category:string="Electronics";
  
  constructor(
    private product: ProductService,
    private session: SessionService,
    private alert: AlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    const user = sessionStorage.getItem(SESSION_KEY.USER);
    this.userDetails = user ? JSON.parse(user) as UserDetailsType : null;
    sessionStorage.setItem('editFlag', 'false');

    this.loginUser=this.userDetails?.userId;
    this.admin=this.session.isAdmin();
  }
  
  getProducts() {
    this.product.getAll().subscribe((res: any) => {
      this.products = res?.offers as ProductDataType[];
    }, this.alert.error());
  }
  delete(offerId: number) { 
    this.product.deletePermanently({
      offerId: offerId
  }).subscribe((res:any) => {
    if(res){
      this.getProducts();
      this.alert.single('Offer deleted successfully.', 'success');
      
    }
    else
    this.alert.error();
  });
   }
  edit(offerId: number){
    this.offerId=offerId;
    sessionStorage.setItem('editFlag', 'true');
    let product=this.products.filter(p=>p.offerId===offerId);
    sessionStorage.setItem('editObj', JSON.stringify(product.length>0?product[0]:'') );
    this.router.navigate(['product'])

    
  }
   engage(offerId: number) { 
    this.product.engage({
      offerId: offerId
  }).subscribe((res:any) => {
    if(res.isSuccess){
      this.getProducts();
      this.alert.single('Successfully engage offer.', 'success');
    }
    else
    this.alert.error();
  });
   }
  liked(offerId: number) { 
    this.product.like({
      offerId: offerId
  }).subscribe((res:any) => {
    if(res){
      this.getProducts();
      this.alert.single('You liked that offer.', 'success');
    }
    else
    this.alert.error();
  });
   }
   onCheckChange(status:string) {
    if(status=="category") { 
        this.product.getByCategory({
          category: this.category
      }).subscribe((res:any) => {
        if(res.isSuccess){
          this.products = res?.offers;
        }
        else
        this.alert.error();
      });
       

    } 
  if(status=="like"){
    this.product.getByLike().subscribe((res:any) => {
    if(res.isSuccess){
      this.products = res?.offers;
    }
    else
    this.alert.error();
  });
   
  }}
}
