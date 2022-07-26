import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Study} from '../../../Interfaces/study';
import { EditEstudiosService } from 'src/app/Services/edit-estudios.service';
import{Router,ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-study',
  templateUrl: './form-study.component.html',
  styleUrls: ['./form-study.component.css']
})
export class FormStudyComponent implements OnInit {
  study?: Study = {
    titulo:"",
    logo:"",
    institucion:"",
    periodo:null!,
    detalles:""};
  id:any;
  editing:boolean=false;  
  studyUp!: Study[];
  status? : boolean;
  periodovalidator?:boolean = true;
  form: UntypedFormGroup;

  
  
  constructor(
    private EditEstudiosService: EditEstudiosService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,

    private activatedRoute: ActivatedRoute
    ) {

      this.form = this.formBuilder.group({
        id: ['',[]],
        titulo: ['',[Validators.required]],
        logo: ['',[]],
        institucion: ['',[Validators.required]],
        periodo: ['',[]],
        detalles: ['',[]]        
      })


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
        this.EditEstudiosService.getStudies()
        .subscribe((data:Study[]) =>{
          this.studyUp = data;
          this.study = this.studyUp.find((m)=>{return m.id==this.id});
          this.form.patchValue(this.study!);
          
          
          })
          }
          else{
            this.editing=false;
          }        
      }

  ngOnInit(): void {
  }
  onSubmit(event: Event){ 
    
    if(!this.PeriodoStart?.value){
      this.periodovalidator =false;
      
    }
    if(this.study?.logo===""){
      this.study.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
    }
    if(this.form.valid){
    if(this.editing){
      this.study=this.form.value;
      this.EditEstudiosService.editStudy(this.study!).subscribe(()=>{
        this.router.navigateByUrl('home');
        alert("Producto actualizado")
        
      })
    } 
    else{
    this.study=this.form.value;
    this.EditEstudiosService.addStudy(this.study!)
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
  get Titulo(){
    return this.form.get('titulo');

  }
  get Logo(){
    return this.form.get('logo');

  }
  get Institucion(){
    return this.form.get('institucion');

  }
  get About(){
    return this.form.get('detalles');

  }
  get PeriodoStart(){
    return this.form.get('periodo');
 
  }

}
