import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../Interfaces/person';
import { EditPersonService } from 'src/app/Services/edit-person.service';
import{Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {
  user?: User = {
    nombre:"",
    titulo:"",
    about:"",
    foto:"",
    };
  id=1;
  editing:boolean=true;  
  userUp!: User[];
  status? : boolean;
  
  
  constructor(
    private editPerService: EditPersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      if(window.localStorage.getItem('statusquo')){
        this.status = true;
      }
      else{ 
        this.status = false;
        alert("Acceso denegado, iniciar sesion")
        this.router.navigateByUrl('')
      }      
      this.editPerService.getUsers()
      .subscribe((data:User[]) => {
        this.userUp = data;
        this.user = this.userUp.find(m=>{return m.id==this.id})});
      }

  ngOnInit(): void {
  }
  onSubmit(){ 
    if(this.user?.foto===""){
      this.user.foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
    }
    /*if(this.editing){*/
      this.editPerService.editUser(this.user!).subscribe(()=>{
        this.router.navigateByUrl('home');
        alert("Usuario actualizado")
      })
  /*  } 
    else{
    this.editPerService.addUser(this.user!)
    .subscribe(() => {
      this.router.navigateByUrl('')
      alert('Usuario guardado')})
    }*/
  }
  cancelarBtn(){;
    this.router.navigateByUrl('home')
  }

}


