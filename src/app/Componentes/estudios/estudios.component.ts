import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import{Study} from '../../Interfaces/study'
import{EditEstudiosService} from '../../Services/edit-estudios.service'
import{UiService} from 'src/app/Services/ui.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  subscription?: Subscription;
  faPlusCircle = faPlusCircle;
  studies: Study[]= [];
  constructor
  (
    private EditEstudiosService: EditEstudiosService,
    private UiService: UiService
    ) 
  {}
     ngOnInit(): void {
    this.EditEstudiosService.getStudies().subscribe((studies) =>{
      this.studies = studies;
    });
  }
  onClick(){
       this.btnClick.emit();
  }
  deleteStudy(study:Study){
    this.EditEstudiosService.deleteStudy(study).subscribe(
      () =>{
      this.studies = this.studies.filter((t) =>
      (t.id !== study.id)
      )})
  }
 
  addStudy(study:Study){
    this.EditEstudiosService.addStudy(study).subscribe((study) =>{
      this.studies.push(study);
    })
  }

}
