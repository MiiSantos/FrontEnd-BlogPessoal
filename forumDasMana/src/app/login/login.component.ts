import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { userLogin } from '../model/userLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: userLogin = new userLogin()

  constructor(
    private auth: AuthService,
    private routed: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.login(this.userLogin).subscribe((resp: userLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto

      this.routed.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500) {
        alert('Usuário ou senha incorretos!')
      }   
    }
  )
  }
}
