import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import{Study} from '../../Interfaces/study'
import{EditEstudiosService} from '../../Services/edit-estudios.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  status: boolean | undefined;
  @Input() editOK?: boolean;
  constructor
  (
    private EditEstudiosService: EditEstudiosService, private router: Router
    
    ) 
  {}
     ngOnInit(): void {
    this.EditEstudiosService.getStudies().subscribe((studies: Study[]) =>{
      this.studies = studies.sort(function(a,b){return a.indice! - b.indice!});;
    });
    if(window.localStorage.getItem('statusquo')){
      this.status = true;
    }
    else{ 
      this.status = false;


    }      
  }

  onSavePos(){
    for(let study of this.studies){
      study.indice = this.studies.indexOf(study);
      this.EditEstudiosService.editStudy(study).subscribe();
    }
    alert("Posicion guardada")
  }

  deleteStudy(study:Study){
    this.EditEstudiosService.deleteStudy(study).subscribe(
      () =>{
      this.studies = this.studies.filter((t) =>
      (t.id !== study.id)
      )})
  }
 
  addStudy(study:Study){
    this.EditEstudiosService.addStudy(study).subscribe((study: Study) =>{
      this.studies.push(study);
    })
  }
  sendEdit(){
    this.router.navigateByUrl('/studyform');
  }
  drop(e : CdkDragDrop <any>){
    moveItemInArray(this.studies,e.previousIndex,e.currentIndex);
  }
}
