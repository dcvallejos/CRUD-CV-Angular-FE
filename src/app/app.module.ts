import { NgModule } from '@angular/core';
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
import { InicioComponent } from './Componentes/Forms/inicio/inicio.component';
import { LandingPageComponent } from './Componentes/landing-page/landing-page.component';
import { SkillsComponent } from './Componentes/skills/skills.component';


const routes=[
  {path: '', component: LandingPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'form', component: FormExpComponent},
  {path: 'form/:id', component: FormExpComponent},
  {path: 'studyform', component: FormStudyComponent},
  {path: 'studyform/:id', component: FormStudyComponent},
  {path: 'sessionform', component: InicioComponent},
  {path: 'personform', component: FormPersonComponent}

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
    InicioComponent,
    FormStudyComponent,
    FormPersonComponent,
    LandingPageComponent,
    SkillsComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
