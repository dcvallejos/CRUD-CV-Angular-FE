import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../Model/person';
import { EditPersonService } from 'src/app/Services/edit-person.service';
import{Router,ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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
  form: UntypedFormGroup;
  
  constructor(
    private formBuilder: UntypedFormBuilder,

    private editPerService: EditPersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

      this.form = this.formBuilder.group({
        id: ['',[]],
        nombre: ['',[Validators.required]],
        titulo: ['',[Validators.required]],
        foto: ['',[]],
        about: ['',[Validators.required]]
      })

      
      this.editPerService.getUsers()
      .subscribe((data:User[]) => {
        this.userUp = data;
        this.user = this.userUp.find(m=>{return m.id==this.id});
        this.form.patchValue(this.user!);
      });
        

      }

  ngOnInit(): void {
  }
  onSubmit(){ 
    if(this.user?.foto===""){
      this.user.foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
    }
    if(this.form.valid){
    this.user=this.form.value;
      this.editPerService.editUser(this.user!).subscribe(()=>{
        this.router.navigateByUrl('home');
        alert("Usuario actualizado")
      })
    }
    else{
      alert("Faltan campos por completar")
    }
  }
  cancelarBtn(){;
    this.router.navigateByUrl('home')
  }
  get Nombre(){
    return this.form.get('nombre');

  }
  get Titulo(){
    return this.form.get('titulo');

  }
  get Foto(){
    return this.form.get('foto');

  }
  get About(){
    return this.form.get('about');

  }


}


