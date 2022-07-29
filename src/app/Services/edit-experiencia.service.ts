import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import{Observable, of} from 'rxjs';
import{Exp} from '../Interfaces/exp'

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
@Injectable({
  providedIn: 'root'
})
export class EditExperienciaService {

  private apiUrl = ' http://localhost:3000/exps'
  constructor(
    private http:HttpClient,
  ) { }

  getExps(): Observable<Exp[]>{
    return this.http.get<Exp[]>(this.apiUrl);
  }
  deleteExp(exp: Exp): Observable<Exp>{
    const url = `${this.apiUrl}/${exp.id}`
    return this.http.delete<Exp>(url);
  }  
  getExp(exp: Exp): Observable<Exp[]>{
    const url = `${this.apiUrl}/${exp.id}`
    return this.http.get<Exp[]>(url);
  }
  addExp(exp: Exp): Observable<Exp>{
    return this.http.post<Exp>(this.apiUrl,exp);
  }
  editExp(exp: Exp): Observable<Exp>{
    const url = `${this.apiUrl}/${exp.id}`
    return this.http.put<Exp>(url,exp);
  }

}


