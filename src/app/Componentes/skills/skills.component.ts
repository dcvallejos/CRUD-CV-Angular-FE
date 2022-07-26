import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/Interfaces/skill';
import{EditSkillService} from '../../Services/edit-skill.service'
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  subscription?: Subscription;
  skills :Skill[] = [];
  faPencil = faPencil;
  status: boolean | undefined;

  constructor(private editSkillService: EditSkillService,private router: Router) {
    this.editSkillService.getSkills().subscribe((skills: Skill[]) =>{
      this.skills = skills;});
   }

  ngOnInit(): void {     
    if(window.localStorage.getItem('statusquo')){
    this.status = true;
  }
  else{ 
    this.status = false;
  }            

  }
  sendEdit(){
    this.router.navigateByUrl('form-skill')
  }

}