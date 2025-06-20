import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaFilmesComponent } from './Pages/lista-filmes/lista-filmes.component';
import { FilmeComponent } from './Pages/filme/filme.component';
import { ListaFavoritosComponent } from './Pages/lista-favoritos/lista-favoritos.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './Components/header/header.component';
import { ListaAssistirDepoisComponent } from './Pages/lista-assistir-depois/lista-assistir-depois.component';
import { CarrosselComponent } from './Components/carrossel/carrossel.component';
import { ResenhaPipe } from './Pipes/resenha.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NumberPipe } from './Pipes/number.pipe';
import { DialogVotoComponent } from './Components/dialogs/dialog-voto/dialog-voto.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaFilmesComponent,
    FilmeComponent,
    ListaFavoritosComponent,
    HeaderComponent,
    ListaAssistirDepoisComponent,
    CarrosselComponent,
    ResenhaPipe,
    NumberPipe,
    DialogVotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }