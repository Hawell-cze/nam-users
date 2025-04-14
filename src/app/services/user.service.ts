import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Vybere všechny uživatele 'users' nebo jednoho podle ID
  getUsers (): Observable<any> { 
    const users = this.http.get(this.apiUrl + '/users');  
    return users;
  }   //je potřeba spojit všechny objekty do jednoho, prozatím budu pracovat s jedním objektem

  // Vybere uživatele dle ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  // Vybere všechny role 'roles'
  getRoles (): Observable<any> { 
    return this.http.get(this.apiUrl + '/roles');
  }
  
  // Vybere všechny statusy 'status'
  getStatus (): Observable<any> { 
    return this.http.get(this.apiUrl + '/status');
  }

  // Aktualizuje uživatele s ID
  updateUser(id: number, userData: any): Observable<any> { 
    return this.http.put(`${this.apiUrl}/users/${id}`, userData);
  }

  // Vloží nového uživatele, o ID se postará json-server (nefunguje když je ID typ string - přidává string)
  insertUser(userData: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/users/`, userData);
  }

  // Smaže uživatele s ID
  deleteUser(id: number): Observable<void> { // smaže uživatele s ID
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }



}
