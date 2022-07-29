import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import{Observable, of} from 'rxjs';
import{Proy} from '../Interfaces/proyect'


const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
@Injectable({
  providedIn: 'root'
})
export class EditProyectoService {
  private apiUrl = ' https://vast-shore-26100.herokuapp.com/proyecto'

  constructor(
    private http:HttpClient,
  ) { }

  getProys(): Observable<Proy[]>{
    return this.http.get<Proy[]>(this.apiUrl);
  }
  deleteProy(proy: Proy): Observable<Proy>{
    const url = `${this.apiUrl}/${proy.id}`
    return this.http.delete<Proy>(url);
  }  
  getProy(proy: Proy): Observable<Proy[]>{
    const url = `${this.apiUrl}/${proy.id}`
    return this.http.get<Proy[]>(url);
  }
  addProy(proy: Proy): Observable<Proy>{
    return this.http.post<Proy>(this.apiUrl,proy);
  }
  editProy(proy: Proy): Observable<Proy>{
    const url = `${this.apiUrl}/${proy.id}`
    return this.http.put<Proy>(url,proy);
  }
}


