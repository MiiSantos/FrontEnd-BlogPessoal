import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { tema } from '../model/tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: tema = new tema()
  listaTema: tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alerta.showAlertDanger('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/login'])
    }

    if(environment.tipo == 'adm') {
      this.alerta.showAlertInfo('Você precisa ser administrador para acessar esse conteúdo!')
      this.router.navigate(['/inicio']) 
    }

    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: tema[]) => {
      this.listaTema = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: tema) => {
      this.tema = resp
      this.alerta.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new tema()
    })
  } 

}
