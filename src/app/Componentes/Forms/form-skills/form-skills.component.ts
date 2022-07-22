import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder, FormGroup, FormArray } from '@angular/forms';

import{EditSkillService} from '../../../Services/edit-skill.service'
import { Skill } from 'src/app/Interfaces/skill';
import { Subscription } from 'rxjs';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormSkillItemComponent } from './form-skill-item/form-skill-item.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-skills',
  templateUrl: './form-skills.component.html',
  styleUrls: ['./form-skills.component.css']

})
export class FormSkillsComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faTimes = faTimes;
  form!: UntypedFormGroup;
  subscription?: Subscription;
  skills :Skill[] = [];
  skillnw :Skill ={
    "nombre": '',
    "puntaje": null!
  }

  @Input() skill!: Skill;


  constructor(    private router: Router,private formBuilder: UntypedFormBuilder, private editSkillService: EditSkillService) {
    this.editSkillService.getSkills().subscribe((skills: Skill[]) =>{
      this.skills = skills;
    })
   }

  ngOnInit(): void {   
  }

  onSubmit(){
    for(let skill of this.skills){
      this.editSkillService.editSkill(skill).subscribe();

    }
    alert("Skills guardadas");
    this.router.navigateByUrl('home')
  }

  onNew(skill:Skill){
    this.skill=this.skillnw;
    this.editSkillService.addSkill(skill).subscribe((skill: Skill) =>{
      this.skills.push(skill);
     })
  }

  onDelete(skill:Skill){
    this.editSkillService.deleteSkill(skill).subscribe(
      () =>{
      this.skills = this.skills.filter((t) =>
      (t.id !== skill.id)
      )})
  }

  cancelarBtn(){
    this.router.navigateByUrl('home')
  }

  get Puntaje(){
    return this.form.get('puntaje');
  }

  get SkillName(){
    return this.form.get('nombreSkill');
  }

  get PuntajeValid(){
    return this.Puntaje?.touched && !this.Puntaje?.valid;
  }

  get SkillNameValid(){
    return false;
  }

}
