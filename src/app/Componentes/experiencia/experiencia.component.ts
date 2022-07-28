import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import{Exp} from '../../Interfaces/exp'
import{EditExperienciaService} from '../../Services/edit-experiencia.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})




export class ExperienciaComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  subscription?: Subscription;
  faPlusCircle = faPlusCircle;
  exps: Exp[]= [];
  status: boolean | undefined;
  constructor
  (
    private EditExpService: EditExperienciaService,    private router: Router,

   
    ) 
  {}
     ngOnInit(): void {
    this.EditExpService.getExps().subscribe((exps: Exp[]) =>{
      this.exps = exps;

    });
    if(window.localStorage.getItem('statusquo')){
      this.status = true;
    }
    else{ 
      this.status = false;


    }      
  }
  onClick(){
       this.btnClick.emit();
  }
  deleteExp(exp:Exp){
    this.EditExpService.deleteExp(exp).subscribe(
      () =>{
      this.exps = this.exps.filter((t) =>
      (t.id !== exp.id)
      )})
  }
  editExp = (exp: Exp): void => {
  }

  addExp(exp:Exp){
    this.EditExpService.addExp(exp).subscribe((exp: Exp) =>{
      this.exps.push(exp);
    })
  }
  toggleAddExp(){
  }
  sendEdit(){
    this.router.navigateByUrl('/form');
  }
}
