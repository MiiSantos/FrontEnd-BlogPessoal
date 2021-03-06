import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { userLogin } from '../model/userLogin';
import { usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(userLogin: userLogin): Observable<userLogin>{
    return this.http.post<userLogin>('http://localhost:8080/usuario/logar', userLogin)
  }

  cadastro(usuario: usuario): Observable<usuario>{
    return this.http.post<usuario>('http://localhost:8080/usuario/cadastrar', usuario)
  }

  getByIdUser(id: number): Observable<usuario> {
      return this.http.get<usuario>(`http://localhost:8080/usuario/${id}`)
  }

  logado() {
    let ok = false

    if(environment.token != '') {
      ok = true
    }

    return ok
  }
}
