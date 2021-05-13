import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tema } from 'src/app/model/tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: tema = new tema()
  idTema: number

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

    this.idTema = this.route.snapshot.params['id']
    this.findById(this.idTema)
  }

  findById(id: number) {
    this.temaService.getById(id).subscribe((resp: tema) => {
      this.tema = resp
    })
  }

  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      this.alerta.showAlertSuccess('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
