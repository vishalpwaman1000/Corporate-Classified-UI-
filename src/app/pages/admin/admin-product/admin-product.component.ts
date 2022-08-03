import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsType } from 'src/app/interfaces/user.type';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SESSION_KEY } from 'src/app/services/storage/session.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  editFlag:any;
  formData :any={};
  empId: string="";
  userDetails: any;
  obj: any | null='';
  productName: string='';
  category: any;
  productPrice: any;
  productDescription: any;
  productCondition: any;

  constructor(
    private alert: AlertService,
    private product: ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.editFlag=JSON.parse(sessionStorage.getItem('editFlag')||'');
    this.obj=JSON.parse(sessionStorage.getItem('editObj')||'');
 
    if(this.editFlag==true){
      this.productName=this.obj.productName;
      this.category=this.obj.category;
      this.productPrice=this.obj.productPrice;
      this.productDescription=this.obj.productDescription;
      this.productCondition=this.obj.productCondition;


      // NgForm.form.value.productName=obj.productName;
      // formRef.form.value.productCategory=obj.category;
      // formRef.form.value.productPrice=obj.productPrice;
      // formRef.form.value.description=obj.productDescription;
      // formRef.form.value.condition=obj.productCondition;

    }

  }

  formSubmit(formRef: NgForm) {

    const values = formRef.form.value;
    const user = sessionStorage.getItem(SESSION_KEY.USER);
    this.userDetails = user ? JSON.parse(user) as UserDetailsType : null;
 
    this.empId=this.userDetails?.userId;
    this.formData.productName=values?.productName;
    this.formData.category= values?.productCategory;
    this.formData.productPrice=values?.productPrice;
    this.formData.productDescription= values?.description;
    this.formData.productCondition=values?.condition;
    this.formData.employeeId= this.empId;
    if(this.editFlag){
      this.formData.status= values?.status;
      this.formData.offerId= this.obj.offerId;

      this.product.edit(this.formData).subscribe((res: any) => {
        if (res?.isSuccess) {
          formRef.resetForm();
          this.router.navigate(['buy']);

         }
        this.alert.show({
          title: res?.isSuccess ? "Success" : "Error",
          message: res?.message,
          icon: res?.isSuccess ? 'success' : 'error'
        });
      })
    this.editFlag=false;
    }
    else{
    this.product.add(this.formData).subscribe((res: any) => {
      if (res?.isSuccess) {
        formRef.resetForm();
        this.router.navigate(['buy']);

       }
      this.alert.show({
        title: res?.isSuccess ? "Success" : "Error",
        message: res?.message,
        icon: res?.isSuccess ? 'success' : 'error'
      });
    })
  }
  }

  addProduct() {

  }
  
}
