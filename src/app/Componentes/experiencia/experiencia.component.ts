import { Component, OnInit,Output,EventEmitter, ViewChild } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import{Exp} from '../../Interfaces/exp'
import{EditExperienciaService} from '../../Services/edit-experiencia.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ExpItemComponent } from './exp-item/exp-item.component';


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
  indice? : number;
  constructor
  (
    private EditExpService: EditExperienciaService,    private router: Router,

   
    ) 
  {}
     ngOnInit(): void {
    this.EditExpService.getExps().subscribe((exps: Exp[]) =>{
      this.exps = exps.sort(function(a,b){return a.index! - b.index!});

    });
    if(window.localStorage.getItem('statusquo')){
      this.status = true;
    }
    else{ 
      this.status = false;


    }      
  }
  onSavePos(){
    for(let exp of this.exps){
      exp.index = this.exps.indexOf(exp);
      this.EditExpService.editExp(exp).subscribe();
  }
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

  sendEdit(){
    this.router.navigateByUrl('/form');
  }

  drop(e : CdkDragDrop <any>){
    moveItemInArray(this.exps,e.previousIndex,e.currentIndex);
    console.log(this.exps[e.currentIndex])





    
  }

}
