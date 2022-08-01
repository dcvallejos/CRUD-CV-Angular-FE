import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{ RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './Componentes/top-bar/top-bar.component';
import { PersonaComponent } from './Componentes/persona/persona.component';
import { ExperienciaComponent } from './Componentes/experiencia/experiencia.component';
import { EstudiosComponent } from './Componentes/estudios/estudios.component';
import { EstItemComponent } from './Componentes/estudios/est-item/est-item.component';

import { FormExpComponent } from './Componentes/Forms/form-exp/form-exp.component';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpItemComponent } from './Componentes/experiencia/exp-item/exp-item.component';
import { HomeComponent } from './home/home.component';
import { FormStudyComponent } from './Componentes/Forms/form-study/form-study.component';
import { FormPersonComponent } from './Componentes/Forms/form-person/form-person.component';
import { LandingPageComponent } from './Componentes/landing-page/landing-page.component';
import { SkillsComponent } from './Componentes/skills/skills.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { SkillsItemComponent } from './Componentes/skills/skills-item/skills-item.component';
import { ProyectosComponent } from './Componentes/proyectos/proyectos.component';
import { FormSkillsComponent } from './Componentes/Forms/form-skills/form-skills.component';
import  {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import { FormSkillItemComponent } from './Componentes/Forms/form-skills/form-skill-item/form-skill-item.component'
import { CommonModule } from "@angular/common";
import { FooterComponent } from './Componentes/footer/footer.component';
import { ItemProyectoComponent } from './Componentes/proyectos/item-proyecto/item-proyecto.component';
import { FormProyectComponent } from './Componentes/Forms/form-proyect/form-proyect.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LoginComponent } from './Componentes/Login/login/login.component';
import { interceptorProvider } from './Services/interceptor-service';
import { AuthGuard } from './Services/auth.guard';


const routes=[
  {path: '', component: LandingPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'form', component: FormExpComponent,canActivate:[AuthGuard]},
  {path: 'form/:id', component: FormExpComponent,canActivate:[AuthGuard]},
  {path: 'studyform', component: FormStudyComponent,canActivate:[AuthGuard]},
  {path: 'studyform/:id', component: FormStudyComponent,canActivate:[AuthGuard]},
  {path: 'personform', component: FormPersonComponent,canActivate:[AuthGuard]},
  {path: 'proyectform', component: FormProyectComponent,canActivate:[AuthGuard]},
  {path: 'proyectform/:id', component: FormProyectComponent,canActivate:[AuthGuard]},
  {path: 'form-skill', component: FormSkillsComponent,canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent}


]
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PersonaComponent,
    ExperienciaComponent,
    EstudiosComponent,
    FormExpComponent,
    ExpItemComponent,
    EstItemComponent,
    HomeComponent,
    FormStudyComponent,
    FormPersonComponent,
    LandingPageComponent,
    SkillsComponent,
    SkillsItemComponent,
    ProyectosComponent,
    FormSkillsComponent,
    FormSkillItemComponent,
    FooterComponent,
    ItemProyectoComponent,
    FormProyectComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    NgCircleProgressModule.forRoot({
      "percent": 100,
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
      "lazy": false,
      "subtitle":""}),
      RoundProgressModule,
      DropDownListModule,
      CommonModule,
      BrowserAnimationsModule,
      DragDropModule
       
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
