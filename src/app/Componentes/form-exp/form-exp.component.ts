import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Exp} from '../../Interfaces/exp';
import { EditExperienciaService } from 'src/app/Services/edit-experiencia.service';
import{Router,ActivatedRoute} from '@angular/router';


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
    periodo:"",
    tareas:""};
  id:any;
  editing:boolean=false;  
  expUp!: Exp[];

  
  
  constructor(
    private editExpService: EditExperienciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.id = this.activatedRoute.snapshot.params['id']
      console.log(this.id)
      if(this.id){
        this.editing = true;
        this.editExpService.getExps()
        .subscribe((data:Exp[]) =>{
          this.expUp = data;
          this.exp = this.expUp.find((m)=>{return m.id==this.id})
          console.log(this.exp)})
          }
          else{
            this.editing=false;
          }        
      }

  ngOnInit(): void {
  }
  onSubmit(){ 
    if(this.exp?.logo===""){
      this.exp.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
    }
    if(this.editing){
      this.editExpService.editExp(this.exp!).subscribe((data)=>{
        this.router.navigateByUrl('');
        alert("Producto actualizado")
      })
    } 
    else{
    this.editExpService.addExp(this.exp!)
    .subscribe(() => {
      this.router.navigateByUrl('')
      alert('Producto guardado')})
    }
  }
  cancelarBtn(){;
    this.router.navigateByUrl('')
  }

}

