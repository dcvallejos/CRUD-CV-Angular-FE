import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http'
import{Observable, of} from 'rxjs';
import{User} from '../Model/person'

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

@Injectable({
  providedIn: 'root'
})
export class EditPersonService {
  private apiUrl = 'https://young-badlands-34211.herokuapp.com/personas'

  constructor(
    private http:HttpClient,
  ) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
  
  deleteUser(user: User): Observable<User>{
    const url = `${this.apiUrl}/${user.id}`
    return this.http.delete<User>(url);
  }  
  getUser(user: User): Observable<User[]>{
    const url = `${this.apiUrl}/${user.id}`
    return this.http.get<User[]>(url);
  }
  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.apiUrl,user);
  }
  editUser(user: User): Observable<User>{
    const url = `${this.apiUrl}/${user.id}`
    return this.http.put<User>(url,user);
  }
}

