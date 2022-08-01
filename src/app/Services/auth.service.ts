import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDTO } from '../Model/jwtDTO';
import { LoginUsuario } from '../Model/login-usuario';
import { NuevoUsuario } from '../Model/usuario-nuevo';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://young-badlands-34211.herokuapp.com/auth/'
  token! :string;
  isLoggedIn = false;


  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

  public nuevo(nuevoUsuario : NuevoUsuario):Observable<any> {
    return this.http.post<any>(this.apiUrl + 'nuevo', nuevoUsuario)

  }

  public login(loginUsuario:LoginUsuario):Observable<jwtDTO> {
    return this.http.post<jwtDTO>(this.apiUrl + 'login', loginUsuario)    
  }

  isAuthenticated(){
    if(this.tokenService.getToken()){
      return this.isLoggedIn = true;
    }  else{
      alert("Acceso restringido, por favor inicie sesion")
      return this.isLoggedIn = false;
      
      
    }
  }


}
