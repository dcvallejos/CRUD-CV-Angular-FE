import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/Model/login-usuario';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  isLoggInFail: boolean = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errorMsj!:string;
  form : UntypedFormGroup;

  constructor(private tokenService: TokenService, private authService : AuthService, private router: Router, private formBuilder: UntypedFormBuilder) {

    this.form = this.formBuilder.group({
      nombreUsuario: ['',[Validators.required]],
      password: ['',[Validators.required]]
   })}

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoggInFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin():void{
    if(this.form.valid){
      this.nombreUsuario = this.Username!.value;
      this.password = this.Password!.value;
    this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe((data) => {
        this.isLogged = true;
        this.isLoggInFail= false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        alert("Sesion iniciada, bienvenido")
        this.router.navigateByUrl('home')
      },err =>{
        this.isLogged = false;
        this.isLoggInFail = true;
        this.errorMsj = "Usuario y/o contraseña incorrectos";
        alert(this.errorMsj)
      })
  }}

    onGuest(){
    window.localStorage.clear();
    alert("Bienvenido")
    this.router.navigateByUrl('/home');

  }

  get Password(){
    return this.form.get('password');
  }

  get Username(){
    return this.form.get('nombreUsuario');
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get UserValid(){
    return false;
  }

}
