import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { LocalStorageService } from './local-storage.service';
import { NotificationService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(
    private localStorageService: LocalStorageService,
    private notificacao: NotificationService
  ) { }

  public adicionarFavorito(filme: FilmeLista): Observable<any> {
    try {
      this.localStorageService.addFavorite(filme);
      return of({ success: true });
    } catch (error) {
      this.notificacao.showmessage("Erro ao favoritar");
      console.error(error);
      return of({ success: false });
    }
  }

  public listarFavoritos(): Observable<FilmeLista[]> {
    try {
      const favorites = this.localStorageService.getFavorites();
      return of(favorites);
    } catch (error) {
      this.notificacao.showmessage("Erro ao listar favoritos");
      console.error(error);
      return of([]);
    }
  }

  public editarFilmeFavorito(filme: FilmeLista): Observable<any> {
    try {
      this.localStorageService.updateFavorite(filme);
      return of({ success: true });
    } catch (error) {
      console.error(error);
      return of({ success: false });
    }
  }

  public deletarFilmeFavorito(id: string): Observable<any> {
    try {
      const favorites = this.localStorageService.getFavorites();
      const movie = favorites.find(fav => fav.idBanco === id);
      if (movie) {
        this.localStorageService.removeFavorite(movie.id);
      }
      return of({ success: true });
    } catch (error) {
      this.notificacao.showmessage("Erro ao excluir");
      console.error(error);
      return of({ success: false });
    }
  }
}