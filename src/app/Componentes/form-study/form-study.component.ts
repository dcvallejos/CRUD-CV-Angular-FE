import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Study} from '../../Interfaces/study';
import { EditEstudiosService } from 'src/app/Services/edit-estudios.service';
import{Router,ActivatedRoute} from '@angular/router';

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
    periodo:"",
    detalles:""};
  id:any;
  editing:boolean=false;  
  studyUp!: Study[];

  
  
  constructor(
    private EditEstudiosService: EditEstudiosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.id = this.activatedRoute.snapshot.params['id']
      console.log(this.id)
      if(this.id){
        this.editing = true;
        this.EditEstudiosService.getStudies()
        .subscribe((data:Study[]) =>{
          this.studyUp = data;
          this.study = this.studyUp.find((m)=>{return m.id==this.id})
          console.log(this.study)})
          }
          else{
            this.editing=false;
          }        
      }

  ngOnInit(): void {
  }
  onSubmit(){ 
    if(this.study?.logo===""){
      this.study.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4VQ5dC2ZMKxY_fQ8VjybwLyIeUPUp0i7kBYEkRyVSLCYav2fI7wprFDOhbiADfFvUm0&usqp=CAU"
    }
    if(this.editing){
      this.EditEstudiosService.editStudy(this.study!).subscribe((data)=>{
        this.router.navigateByUrl('');
        alert("Producto actualizado")
      })
    } 
    else{
    this.EditEstudiosService.addStudy(this.study!)
    .subscribe(() => {
      this.router.navigateByUrl('')
      alert('Producto guardado')})
    }
  }
  cancelarBtn(){;
    this.router.navigateByUrl('')
  }


}
