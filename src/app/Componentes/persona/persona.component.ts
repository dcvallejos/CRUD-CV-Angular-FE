import { Component, OnInit } from '@angular/core';
import {faPencil} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  faPencil = faPencil;
  constructor() { }

  ngOnInit(): void {
  }

}
