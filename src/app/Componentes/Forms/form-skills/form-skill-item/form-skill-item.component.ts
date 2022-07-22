import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {faPencil, faTimes,faTrash,faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import { Skill } from 'src/app/Interfaces/skill';

@Component({
  selector: 'app-form-skill-item',
  templateUrl: './form-skill-item.component.html',
  styleUrls: ['./form-skill-item.component.css']
})
export class FormSkillItemComponent{
  faFloppyDisk=faFloppyDisk;
  faTimes=faTimes;
  faTrash=faTrash;
  @Input() skill!: Skill;
  @Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();
  @Output() onEditSkill: EventEmitter<Skill> = new EventEmitter();
  
  constructor(){}

  static addSkillItem():FormGroup{
    return new FormGroup({
      nombre: new FormControl(''),
      puntaje: new FormControl()
    })
  }


  onDelete(skill:Skill){
    this.onDeleteSkill.emit(skill);
  }
  onSave(skill:Skill){
    this.onEditSkill.emit(skill);;
  }
}
