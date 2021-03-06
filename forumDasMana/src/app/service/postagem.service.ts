import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<postagem[]> {
    return this.http.get<postagem[]>('http://localhost:8080/postagem', this.token)
  }
  
  getByIdPost(id: number): Observable <postagem> {
    return this.http.get<postagem>(`http://localhost:8080/postagem/${id}`, this.token)
  }

  getByTituloPost(titulo: string): Observable<postagem[]> {
    return this.http.get<postagem[]>(`http://localhost:8080/postagem/titulo/${titulo}`, this.token) //pesquisa 
  }

  postPostagem(postagem: postagem): Observable<postagem> {
    return this.http.post<postagem>('http://localhost:8080/postagem', postagem, this.token)
  }

  putPostagem(postagem: postagem): Observable<postagem> {
    return this.http.put<postagem>('http://localhost:8080/postagem', postagem, this.token)
  }

  deletePost(id: number) {
     return this.http.delete(`http://localhost:8080/postagem/${id}`, this.token)
  }
} 
