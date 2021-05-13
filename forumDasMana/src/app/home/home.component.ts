import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postagem: postagem = new postagem()
  listaPostagem: postagem[]
  tituloPost: string

  tema: tema = new tema()
  listaTemas: tema[] 
  idTema: number
  nomeTema: string

  usuario: usuario = new usuario()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == '') {
      this.alerta.showAlertInfo('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/login'])
    }

    this.getAllTema()
    this.getAllPostagens()
  }

  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTemas = resp 
    })
  }

  findByIdTema() {
    this.temaService.getById(this.idTema).subscribe((resp: tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: postagem[]) => {
      this.listaPostagem = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: usuario) => {
      this.usuario = resp
    })
  }
  
  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: postagem) => {
      this.postagem = resp
      this.alerta.showAlertSuccess('Postagem publicada com sucesso!')
      this.postagem = new postagem()
      this.getAllPostagens()
    })  
  }

  findByTituloPost() {

    if(this.tituloPost == '') {
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPost(this.tituloPost).subscribe((resp: postagem[]) => {
        this.listaPostagem = resp
      })
    }   
  }

  findByNomeTema() {
    if(this.nomeTema == '') {
      this.getAllTema()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: tema[]) => {
        this.listaTemas = resp
      })
    }
  }
}
