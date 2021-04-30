import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../model/usuario';
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
    private router: Router
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
        alert('As senhas não batem')
      } else {
        this.authService.cadastro(this.usuario).subscribe((resp: usuario) => {
          this.usuario = resp
          this.router.navigate(['/login'])
          alert('Usuário cadastrado com sucesso!')
        })
      }
  }
}
