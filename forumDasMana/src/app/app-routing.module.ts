import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PostagemDeleteComponent } from './deletar/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './deletar/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './editar/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './editar/tema-edit/tema-edit.component';
import { UserEditComponent } from './editar/user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},

  {path: 'inicio', component: HomeComponent},
  {path: 'tema', component: TemaComponent},

  {path: 'editar/:id', component: TemaEditComponent},
  {path: 'deletar/:id', component: TemaDeleteComponent},
  {path: 'post-edit/:id', component: PostagemEditComponent},
  {path: 'post-delete/:id', component: PostagemDeleteComponent},
  {path: 'user-edit/:id', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
