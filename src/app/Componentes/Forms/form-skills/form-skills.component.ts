import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder} from '@angular/forms';

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
  puntajeValid:boolean=true;
  nombreValid:boolean=true;

  @Input() skill!: Skill;
  status: boolean;


  constructor(    private router: Router,private formBuilder: UntypedFormBuilder, private editSkillService: EditSkillService) {
    this.editSkillService.getSkills().subscribe((skills: Skill[]) =>{
      this.skills = skills;
    });
    if(window.localStorage.getItem('statusquo')){
      this.status = true;
    }
    else{ 
      this.status = false;
      alert("Acceso denegado, iniciar sesion")
      this.router.navigateByUrl('')
    }     
   }

  ngOnInit(): void {   
  }

  onSubmit(){

    this.Validator();
    if(!this.status){
      alert("faltan datos");}
      else{
        for(let skill of this.skills){
          this.editSkillService.editSkill(skill).subscribe();
        }
        alert("Skills guardadas");
        this.router.navigateByUrl('home')
      }
    } 

    Validator(){
      for(let skill of this.skills){
        if(!skill.nombre || !skill.puntaje || skill.puntaje>10){
          this.status=false;
          }    
          else{this.status=true}
        }  
    } 

  onNew(){ 
    this.editSkillService.addSkill(this.skillnw!).subscribe((skill: Skill) =>{
      this.skills.push(skill!);    this.constructor();

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


}
  

