import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';
import { SessionService } from '../storage/session.service';

interface ProductListRequest {
  pageNumber: number;
  numberOfRecordPerPage: number;
}
interface ProductArchiveRequest {
  productID: number;
}

export interface ProductDataType {
  offerId: number,
  employeeId: number,
  status: string,
  likes: number,
  category: string,
  productName: string,
  productCondition: string,
  productDescription: string,
  productPrice: string,
  openedDate: string,
  engagedDate: string,
  closedDate: string
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private api: ApiService,private http: HttpClient,private session:SessionService
  ) { }
  getAuthHeader() {
    const token = this.session.getToken();
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }
  add(payload: FormData) {
    return this.http.post(environment.apiBaseUrl2 + '/api/Offers/AddOffer', payload,{ headers: this.getAuthHeader() });
  }

  getAll() {
    return this.http.get(environment.apiBaseUrl2 +'/api/Offers/GetOfferDetails',{ headers: this.getAuthHeader() });

  }
  edit(payload: FormData){
    return this.http.post(environment.apiBaseUrl2 + '/api/Offers/EditOffer', payload,{ headers: this.getAuthHeader() });

  }
  
  deletePermanently(payload:any) {
    return this.http.delete(environment.apiBaseUrl2 + '/api/Offers/DeleteOffer'+'?offerId='+payload.offerId, { headers: this.getAuthHeader() ,
    });

  }
  like(payload:any) {
    return this.http.post(environment.apiBaseUrl2 + '/api/Offers/AddLike'+'?offerId='+payload.offerId,null, { headers: this.getAuthHeader() ,
    });

  }
  profile(payload:any) {
    return this.http.get(environment.apiBaseUrl3 + '/api/Employee/ViewProfile?employeeId='+payload.employeeId,{ headers: this.getAuthHeader() ,
    });
  }
  engage(payload:any) {
    return this.http.post(environment.apiBaseUrl2 + '/api/Offers/EngageOffer'+'?offerId='+payload.offerId,null, { headers: this.getAuthHeader() ,
    });
  }
  refreshpoints(payload:any) {
    return this.http.post(environment.apiBaseUrl4 + '/api/Points/RefreshPointsOfEmployee'+'?employeeId='+payload.employeeId,null, { headers: this.getAuthHeader() ,
    });
  }
  getByCategory(payload:any) {
    return this.http.get(environment.apiBaseUrl2 + '/api/Offers/GetOfferByCategory?category='+payload.category,{ headers: this.getAuthHeader() ,
    });

  }
  getByLike() {
    return this.http.get(environment.apiBaseUrl2 + '/api/Offers/GetOfferByTopLikes',{ headers: this.getAuthHeader() ,
    });
    
  }
}
