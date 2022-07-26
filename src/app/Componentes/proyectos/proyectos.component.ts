import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import{Proy} from '../../Interfaces/proyect'
import{EditProyectoService} from '../../Services/edit-proyecto.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  @Output() btnClick = new EventEmitter();
  subscription?: Subscription;
  faPlusCircle = faPlusCircle;
  proys: Proy[]= [];
  status: boolean | undefined;
  constructor
  (
    private EditProyService: EditProyectoService,    private router: Router,

   
    ) 
  {}
     ngOnInit(): void {
    this.EditProyService.getProys().subscribe((proys: Proy[]) =>{
      this.proys = proys;
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
  deleteProy(proy:Proy){
    this.EditProyService.deleteProy(proy).subscribe(
      () =>{
      this.proys = this.proys.filter((t) =>
      (t.id !== proy.id)
      )})
  }
  editProy = (proy: Proy): void => {
  }

  addProy(proy:Proy){
    this.EditProyService.addProy(proy).subscribe((proy: Proy) =>{
      this.proys.push(proy);
    })
  }

  sendEdit(){
    this.router.navigateByUrl('/proyectform');
  }
}
