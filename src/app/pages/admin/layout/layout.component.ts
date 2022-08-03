import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailsType } from 'src/app/interfaces/user.type';
import { ProductService } from 'src/app/services/product/product.service';
import { SessionService, SESSION_KEY } from 'src/app/services/storage/session.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  routes = [
    {
      path: '',
      label: 'Home',
      icon: 'home'
    },
    {
      path: 'product',
      label: 'Sell',
      icon: 'styler'
    },
    {
      path: 'buy',
      label: 'Buy',
      icon: 'styler'
    },
   


  ]
  showProfile: boolean=false;
  loginUser: any;
  userDetails: any;
  profileData: any;
  constructor(
    private session: SessionService,
    private route: Router,
    private product:ProductService
  ) { }
  closeProfile(){
    if(this.showProfile)
    this.showProfile=!this.showProfile;
  }
  ngOnInit(): void {
    sessionStorage.setItem('editFlag', 'true');

  }
  
  profileOpen(){
    this.showProfile=!this.showProfile;
    const user = sessionStorage.getItem(SESSION_KEY.USER);
    this.userDetails = user ? JSON.parse(user) as UserDetailsType : null;
 
    this.loginUser=this.userDetails?.userId;
    this.product.refreshpoints({employeeId:this.loginUser}).subscribe((res: any) => {
    })
    this.product.profile({employeeId:this.loginUser}).subscribe((res: any) => {
      this.profileData=res;
    })
  }
  logout() {
    this.session.clear();
    this.route.navigate(['/sign']);
  }

}
