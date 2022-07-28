import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Exp} from '../../../Interfaces/exp';
import { EditExperienciaService } from 'src/app/Services/edit-experiencia.service';
import{Router,ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-exp',
  templateUrl: './form-exp.component.html',
  styleUrls: ['./form-exp.component.css']
})
export class FormExpComponent implements OnInit {
  exp?: Exp = {
    puesto:"",
    logo:"",
    empresa:"",
    periodo:null!,
    periodoEnd:null!,
    tareas:""};
  id:any;
  editing:boolean=false;  
  expUp!: Exp[];
  status? : boolean;
  form: UntypedFormGroup;
  periodovalidator?:boolean = true;
  alt?:boolean = true;
  
  constructor(
    private editExpService: EditExperienciaService,
    private formBuilder: UntypedFormBuilder,

    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

      this.form = this.formBuilder.group({
        id: ['',[]],
        puesto: ['',[Validators.required]],
        empresa: ['',[Validators.required]],
        about: ['',[]],
        logo: ['',[]],
        periodo: ['',[Validators.required]],
        periodoEnd: ['',[Validators.required]]
      })


      //LocalStorage checking
      if(window.localStorage.getItem('statusquo')){
        this.status = true;
      }
      else{ 
        this.status = false;
        alert("Acceso denegado, iniciar sesion")
        this.router.navigateByUrl('')
      }      

      this.id = this.activatedRoute.snapshot.params['id']
      if(this.id){
        this.editing = true;
        this.editExpService.getExps()
        .subscribe((data:Exp[]) =>{
          this.expUp = data;
          this.exp = this.expUp.find((m)=>{return m.id==this.id});
          this.form.patchValue(this.exp!);
          if(this.exp?.periodoEnd === 'la actualidad'){
            this.alt = false;
          }
          })
          }
          else{
            this.editing=false;
          }        
      }

  ngOnInit(): void {}

  disableSending() {
    this.alt=!this.alt  
    this.form.get('periodoEnd')!.patchValue(null);  
    this.periodovalidator =false;    
    }

  onSubmit(event: Event){    
    
      if(!this.PeriodoStart?.value){
        this.periodovalidator =false;      
      }
      if(!this.alt){
        this.form.get('periodoEnd')!.patchValue('la actualidad');
      }
      else if(!this.PeriodoEnd && this.alt){
        this.form.get('periodoEnd')!.patchValue(null);
        this.periodovalidator =false;  
      }


      if(this.form.valid){
        if(this.exp?.logo===""){
          this.exp.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
        }
        if(this.editing){
          this.exp=this.form.value;
          this.editExpService.editExp(this.exp!).subscribe(()=>{
            this.router.navigateByUrl('home');
            alert("Producto actualizado")
          })
        } 
        else{
          this.exp=this.form.value;
          this.editExpService.addExp(this.exp!)
            .subscribe(() => {
              this.router.navigateByUrl('home')
              alert('Producto guardado')})
        } 
      }
    else{
      alert("Falta completar datos")
    }
  }
  cancelarBtn(){;
    this.router.navigateByUrl('home')
  }

  get Puesto(){
    return this.form.get('puesto');

  }
  get Empresa(){
    return this.form.get('empresa');

  }
  get Logo(){
    return this.form.get('logo');

  }
  get About(){
    return this.form.get('about');

  }
  get PeriodoStart(){
    return this.form.get('periodo');

  }
  get PeriodoEnd(){
    return this.form.get('periodoEnd');

  }


}

