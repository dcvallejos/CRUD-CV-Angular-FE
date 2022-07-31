import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import{Exp} from '../../../Interfaces/exp'

@Component({
  selector: 'app-exp-item',
  templateUrl: './exp-item.component.html',
  styleUrls: ['./exp-item.component.css']
})
export class ExpItemComponent implements OnInit {
  faPencil = faPencil;
  faTimes = faTimes;
  @Input() exp!: Exp;
  @Input() editOK?: boolean;

  @Output() onDeleteExp: EventEmitter<Exp> = new EventEmitter();
  
  status: boolean | undefined;
  constructor() { 
  }

  ngOnInit(): void {
    if(window.localStorage.getItem('statusquo')){
      this.status = true;
    }
    else{ 
      this.status = false;
    }    
  }



  onDelete(exp:Exp){
    this.onDeleteExp.emit(exp);
  }

}