import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../model/usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: usuario = new usuario
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.event
  }

  cadastrar() {
      this.usuario.tipo = this.tipoUsuario

      if(this.usuario.senha != this.confirmarSenha) {
        this.alerta.showAlertDanger('As senhas não batem')
      } else {
        this.authService.cadastro(this.usuario).subscribe((resp: usuario) => {
          this.usuario = resp
          this.router.navigate(['/login'])
          this.alerta.showAlertInfo('Usuário cadastrado com sucesso!')
        })
      }
  }
}
