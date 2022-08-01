import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import{Observable, of} from 'rxjs';
import{Skill} from '../Interfaces/skill'

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

@Injectable({
  providedIn: 'root'
})
export class EditSkillService {

  private apiUrl = 'https://young-badlands-34211.herokuapp.com/skill'

  constructor(private http:HttpClient,) { }
  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.apiUrl);
  }
  
  deleteSkill(skill: Skill): Observable<Skill>{
    const url = `${this.apiUrl}/${skill.id}`
    return this.http.delete<Skill>(url);
  }  
  getSkill(skill: Skill): Observable<Skill[]>{
    const url = `${this.apiUrl}/${skill.id}`
    return this.http.get<Skill[]>(url);
  }
  addSkill(skill: Skill): Observable<Skill>{
    return this.http.post<Skill>(this.apiUrl,skill);
  }
  editSkill(skill: Skill): Observable<Skill>{
    const url = `${this.apiUrl}/${skill.id}`
    return this.http.put<Skill>(url,skill);
  }
}






