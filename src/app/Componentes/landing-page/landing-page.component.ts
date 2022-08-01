import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  onUser(){
    this.router.navigateByUrl('/login');
  }
  onGuest(){
    this.router.navigateByUrl('/home');

  }

}
