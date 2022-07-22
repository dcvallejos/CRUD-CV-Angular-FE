import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import{User} from '../../Interfaces/person'
import{EditPersonService} from '../../Services/edit-person.service'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  faPencil = faPencil;
  users!: User[];
  person?: User = {
    nombre:"",
    foto:"",
    titulo:"",
    about:"",
  }
  id=1;
  @Output() onEditUser: EventEmitter<User> = new EventEmitter();
  constructor(
    private EditPerService: EditPersonService
  ) { 
    this.EditPerService.getUsers()
    .subscribe((data:User[]) => {
      this.users = data;
      
      this.person = this.users.find(m=>{return m.id==this.id})});

}

  ngOnInit(): void {


  }
  onClick(user:User){
    this.onEditUser.emit(user);
  }
}
// link foto: https://media-exp1.licdn.com/dms/image/C4E03AQFtBk2_Qug1DA/profile-displayphoto-shrink_200_200/0/1601244586807?e=2147483647&v=beta&t=rtiGUawSDcMh7_kLYITnNS5cyKrksQe1GW59v8yhay0
