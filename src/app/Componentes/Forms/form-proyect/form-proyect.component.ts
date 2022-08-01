import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Proy} from '../../../Interfaces/proyect';
import { EditProyectoService } from 'src/app/Services/edit-proyecto.service';
import{Router,ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-proyect',
  templateUrl: './form-proyect.component.html',
  styleUrls: ['./form-proyect.component.css']
})
export class FormProyectComponent implements OnInit {
  proy?: Proy = {
    nombre:"",
    logo:"",
    periodo:null!,
    about:""};
  id:any;
  editing:boolean=false;  
  proyUp!: Proy[];
  status? : boolean;
  form: UntypedFormGroup;
  periodovalidator?:boolean = true;
  
  constructor(
    private editProyService: EditProyectoService,
    private formBuilder: UntypedFormBuilder,

    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

      this.form = this.formBuilder.group({
        id: ['',[]],
        nombre: ['',[Validators.required]],
        about: ['',[Validators.required]],
        logo: ['',[]],
        link: ['',[]],
        periodo: ['',[Validators.required]]        
      })
      

      this.id = this.activatedRoute.snapshot.params['id']
      if(this.id){
        this.editing = true;
        this.editProyService.getProys()
        .subscribe((data:Proy[]) =>{
          this.proyUp = data;
          this.proy = this.proyUp.find((m)=>{return m.id==this.id})
          this.form.patchValue(this.proy!);
          })
          }
          else{
            this.editing=false;
          }        
      }

  ngOnInit(): void {}

  onSubmit(event: Event){    
      if(!this.Periodo?.value){
        this.periodovalidator =false; 
      }
      if(this.form.valid){

        this.periodovalidator =true;
        if(this.proy?.logo===""){
          this.proy.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
        }
        if(this.editing){
          this.proy=this.form.value;
          this.editProyService.editProy(this.proy!).subscribe(()=>{
            this.router.navigateByUrl('home');
            alert("Proyecto actualizado")
          })
        } 
        else{
          this.proy=this.form.value;
          this.editProyService.addProy(this.proy!)
            .subscribe(() => {
              this.router.navigateByUrl('home')
              alert('Proyecto guardado')})
        } 
      }
    else{
      alert("Falta completar datos")
    }
  }
  cancelarBtn(){;
    this.router.navigateByUrl('home')
  }

  get Nombre(){
    return this.form.get('nombre');

  }
  get Logo(){
    return this.form.get('logo');
  }
  get Link(){
    return this.form.get('link');
  }

  get About(){
    return this.form.get('about');

  }
  get Periodo(){
    return this.form.get('periodo');

  }


}