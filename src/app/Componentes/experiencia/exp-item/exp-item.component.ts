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
  @Output() onDeleteExp: EventEmitter<Exp> = new EventEmitter();
  @Output() onEditExp: EventEmitter<Exp> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onDelete(exp:Exp){
    this.onDeleteExp.emit(exp);
  }
  onClick(exp:Exp){
    this.onEditExp.emit(exp);;
  }
}