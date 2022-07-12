import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import{Observable, of} from 'rxjs';
import{Study} from '../Interfaces/study'

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
@Injectable({
  providedIn: 'root'
})
export class EditEstudiosService {
  private apiUrl = ' https://vast-shore-26100.herokuapp.com/estudio/'
  constructor(private http:HttpClient,
    ) { }
  
    getStudies(): Observable<Study[]>{
      return this.http.get<Study[]>(this.apiUrl);
    }
    deleteStudy(study: Study): Observable<Study>{
      const url = `${this.apiUrl}/${study.id}`
      return this.http.delete<Study>(url);
    }  
    getStudy(study: Study): Observable<Study[]>{
      const url = `${this.apiUrl}/${study.id}`
      return this.http.get<Study[]>(url);
    }
    addStudy(study: Study): Observable<Study>{
      return this.http.post<Study>(this.apiUrl,study);
    }
    editStudy(study: Study): Observable<Study>{
      const url = `${this.apiUrl}/${study.id}`
      return this.http.put<Study>(url,study);
    }
  }
  