import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import{ RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './Componentes/top-bar/top-bar.component';
import { PersonaComponent } from './Componentes/persona/persona.component';
import { ExperienciaComponent } from './Componentes/experiencia/experiencia.component';
import { EstudiosComponent } from './Componentes/estudios/estudios.component';
import { EstItemComponent } from './Componentes/est-item/est-item.component';

import { FormExpComponent } from './Componentes/form-exp/form-exp.component';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpItemComponent } from './Componentes/exp-item/exp-item.component';
import { HomeComponent } from './home/home.component';
import { FormStudyComponent } from './Componentes/form-study/form-study.component';


const routes=[
  {path: '', component: HomeComponent},
  {path: 'form', component: FormExpComponent},
  {path: 'form/:id', component: FormExpComponent},
  {path: 'studyform', component: FormStudyComponent},
  {path: 'studyform/:id', component: FormStudyComponent}

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
    FormStudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
