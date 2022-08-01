import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/person';
import { EditPersonService } from 'src/app/Services/edit-person.service';
import { TokenService } from 'src/app/Services/token.service';

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
  editor:boolean=false;
  editing:boolean=true;    
  
  userUp!: User[];
  status = false;
    @Output() onEditor = new EventEmitter<boolean>();
  constructor(private router: Router,private tokenService : TokenService) {   }

  ngOnInit(): void { 
    if(this.tokenService.getToken()){
      this.status = true;
      this.router.navigateByUrl('home')
    }
    else{ 
      this.status = false;
    }        
  }

  

  exit(){
    this.tokenService.logOut();
    this.router.navigateByUrl('');
  }
  edit(){
    this.editor=!this.editor
    this.onEditor.emit(this.editor);

  }

}
