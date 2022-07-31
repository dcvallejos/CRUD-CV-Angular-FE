import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import{Proy} from '../../../Interfaces/proyect'
@Component({
  selector: 'app-item-proyecto',
  templateUrl: './item-proyecto.component.html',
  styleUrls: ['./item-proyecto.component.css']
})
export class ItemProyectoComponent implements OnInit {
  faPencil = faPencil;
  faTimes = faTimes;
  @Input() proy!: Proy;
  @Input() editOK?: boolean;

  @Output() onDeleteProy: EventEmitter<Proy> = new EventEmitter();
  @Output() onEditProy: EventEmitter<Proy> = new EventEmitter();
  status: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
    if(window.localStorage.getItem('statusquo')){
      this.status = true;
    }
    else{ 
      this.status = false;


    }        
  }
  onDelete(exp:Proy){
    this.onDeleteProy.emit(exp);
  }
  onClick(exp:Proy){
    this.onEditProy.emit(exp);;
  }
}