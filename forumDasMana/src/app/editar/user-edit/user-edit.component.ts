import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: usuario = new usuario()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      alert('Sua sessão expirou, faça login novamente!')
      this.router.navigate(['/login'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.event
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não batem')
    } else {
      this.authService.cadastro(this.usuario).subscribe((resp: usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        alert('Usuário atualizado com sucesso, faça novo login!')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''

        this.router.navigate(['/login'])
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(this.idUser).subscribe((resp: usuario) => {
      this.usuario = resp
    })
  }
}
