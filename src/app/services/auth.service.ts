import { Injectable } from '@angular/core';
import { SignInRequest, SignUpRequestType } from '../interfaces/auth.type';
import { ApiService } from './api.service';
import { SessionService } from './storage/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private session: SessionService
  ) { }

  singUp(userDetails: SignUpRequestType) {
    return this.api.post('/api/Login/SignUp', userDetails);
  }

  signIn(userCred: SignInRequest) {
    return this.api.post('/api/Login/SignIn', userCred);
  }
  
  

}
