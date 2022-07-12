import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import{Study} from '../../../Interfaces/study'
import{faPencil} from '@fortawesome/free-solid-svg-icons'
import{faTimes} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-est-item',
  templateUrl: './est-item.component.html',
  styleUrls: ['./est-item.component.css']
})
export class EstItemComponent implements OnInit {
  faPencil = faPencil;
  faTimes = faTimes;
  @Input() study!: Study;
  @Output() onDeleteStudy: EventEmitter<Study> = new EventEmitter();
  @Output() onEditStudy: EventEmitter<Study> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onDelete(study:Study){
    this.onDeleteStudy.emit(study);
  }
  onClick(study:Study){
    this.onEditStudy.emit(study);;
  }
}