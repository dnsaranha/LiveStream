import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { TestarNumeroGuard } from './Guards/testar-numero.guard';
import { FilmeComponent } from './Pages/filme/filme.component';
import { ListaAssistirDepoisComponent } from './Pages/lista-assistir-depois/lista-assistir-depois.component';
import { ListaFavoritosComponent } from './Pages/lista-favoritos/lista-favoritos.component';
import { ListaFilmesComponent } from './Pages/lista-filmes/lista-filmes.component';

const rotas: Routes = [
  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    component: ListaFilmesComponent
  },
  {
    path: 'filmes/:idFilme',
    component: FilmeComponent,
    canActivate: [TestarNumeroGuard]
  },
  {
    path: 'favoritos',
    component: ListaFavoritosComponent
  },
  {
    path: 'salvos',
    component: ListaAssistirDepoisComponent
  },
  {
    path: 'header',
    component: HeaderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }