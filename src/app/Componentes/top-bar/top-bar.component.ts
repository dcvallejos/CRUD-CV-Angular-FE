import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/person';
import { EditPersonService } from 'src/app/Services/edit-person.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  user?: User = {
    nombre:"",
    };
  id=1;
  editing:boolean=true;  
  userUp!: User[];
  constructor(private editPerService : EditPersonService,private router: Router,) {
    editPerService.getUsers()
      .subscribe((data:User[]) => {
        this.userUp = data;
        this.user = this.userUp.find(m=>{return m.id==this.id})});
   }

  ngOnInit(): void {    
  }

  exit(){
    window.localStorage.clear();
    alert("Sesion finalizada, redirigiendo al inicio")
    this.router.navigate([''])


  }

}
