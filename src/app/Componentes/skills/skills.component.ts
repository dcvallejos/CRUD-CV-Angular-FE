import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/Interfaces/skill';
import{EditSkillService} from '../../Services/edit-skill.service'
import {faPencil} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  subscription?: Subscription;
  skills :Skill[] = [];
  faPencil = faPencil;

  constructor(private editSkillService: EditSkillService) {
    this.editSkillService.getSkills().subscribe((skills: Skill[]) =>{
      this.skills = skills;});
   }

  ngOnInit(): void {     

  }


}