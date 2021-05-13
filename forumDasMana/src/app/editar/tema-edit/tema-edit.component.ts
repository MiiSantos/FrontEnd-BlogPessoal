import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tema } from 'src/app/model/tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: tema = new tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      this.alerta.showAlertInfo('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findById(id)
  }

  findById(id: number) {
    this.temaService.getById(id).subscribe((resp: tema) => {
      this.tema = resp
    })
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: tema) => {
      this.tema = resp
      this.alerta.showAlertSuccess('Tema atualizado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
