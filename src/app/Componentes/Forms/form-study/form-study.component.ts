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
    periodoEnd:null!,
    detalles:"",
    indice:null!};
  id:any;
  editing:boolean=false;  
  studyUp!: Study[];
  studyBox: Study[]= []; 

  status? : boolean;
  periodovalidator?:boolean = true;
  form: UntypedFormGroup;
  alt?:boolean = true;
  
  
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
        periodo: ['',[Validators.required]],
        periodoEnd: ['',[]],
        detalles: ['',[]]        
      })

      this.id = this.activatedRoute.snapshot.params['id']
      if(this.id){
        this.editing = true;
        this.EditEstudiosService.getStudies()
        .subscribe((data:Study[]) =>{
          this.studyUp = data;
          this.study = this.studyUp.find((m)=>{return m.id==this.id});
          this.form.patchValue(this.study!);
          if(!this.study?.periodoEnd){
            this.alt = false;
          }
          })
          }
          else{
            this.editing=false;
          }
          this.EditEstudiosService.getStudies().subscribe((data:Study[]) =>{this.studyBox =data})

      }

  ngOnInit(): void {}

  disableSending() {
    this.alt=!this.alt;  
    this.addValidators()
    }

    addValidators(){
      this.PeriodoEnd!.patchValue(null);  
      this.PeriodoEnd!.setValidators([Validators.required]);
      this.form.updateValueAndValidity();
    }

    removeValidators(){
      this.PeriodoEnd!.clearValidators();
      this.PeriodoEnd!.setValidators(null);
      this.form.updateValueAndValidity();
    }
    
      onSubmit(){    
        this.removeValidators();
        
      if(!this.PeriodoStart || !this.PeriodoEnd){
        this.periodovalidator =false;      
      }
      if(this.form.valid){

      if(this.editing){
        this.study=this.form.value;
        if(this.study?.logo===""){
          this.study.logo = "https://static.vecteezy.com/system/resources/thumbnails/005/260/883/small/simple-university-icon-free-vector.jpg"
        }
        this.EditEstudiosService.editStudy(this.study!).subscribe(()=>{
          this.router.navigateByUrl('home');
          alert("Producto actualizado")         
        })
      } 
      else{
      this.study=this.form.value;
      this.study!.indice = this.studyBox.length +1;
      if(this.study?.logo===""){
        this.study.logo = "https://static.vecteezy.com/system/resources/thumbnails/005/260/883/small/simple-university-icon-free-vector.jpg"
      }
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
  get PeriodoEnd(){
    return this.form.get('periodoEnd');

  }
}
