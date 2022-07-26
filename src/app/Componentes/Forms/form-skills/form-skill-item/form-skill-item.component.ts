import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  form: UntypedFormGroup;

  @Input() skill!: Skill;
  @Input() status!:boolean;
  @Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();
  @Output() onEditSkill: EventEmitter<Skill> = new EventEmitter();
  
  constructor(    private router: Router,
    private formBuilder: UntypedFormBuilder,

    ){
      this.form = this.formBuilder.group({
        id: ['',[]],
        nombre: ['',[Validators.required]],
        puntaje: ['',[Validators.required,Validators.max(10),Validators.min(0)]],
  
      })
 
  }

  get Puntaje(){
    return this.form.get('puntaje');
  }

  get SkillName(){
    return this.form.get('nombre');
  }

  onDelete(skill:Skill){
    this.onDeleteSkill.emit(skill);
  }
  onSave(skill:Skill){
    if(this.form.valid){
    this.onEditSkill.emit(skill);
    }
    else{
      this.status=false;

      alert("Faltan campos que completar")
    }
  }
}
