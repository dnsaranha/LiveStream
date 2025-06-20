import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { LocalStorageService } from './local-storage.service';
import { NotificationService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class SalvosService {

  constructor(
    private localStorageService: LocalStorageService,
    private notificacao: NotificationService
  ) { }

  public adicionarFilme(filme: FilmeLista): Observable<any> {
    try {
      this.localStorageService.addToWatchLater(filme);
      return of({ success: true });
    } catch (error) {
      this.notificacao.showmessage("Erro ao salvar");
      console.error(error);
      return of({ success: false });
    }
  }

  public listarFilmesSalvos(): Observable<FilmeLista[]> {
    try {
      const watchLater = this.localStorageService.getWatchLater();
      const watched = this.localStorageService.getWatched();
      return of([...watchLater, ...watched]);
    } catch (error) {
      this.notificacao.showmessage("Erro ao listar");
      console.error(error);
      return of([]);
    }
  }

  public editarFilmeSalvo(filme: FilmeLista): Observable<any> {
    try {
      if (filme.assistido) {
        this.localStorageService.markAsWatched(filme);
        this.localStorageService.removeFromWatchLater(filme.id);
      } else {
        this.localStorageService.updateWatchLater(filme);
      }
      return of({ success: true });
    } catch (error) {
      console.error(error);
      return of({ success: false });
    }
  }

  public deletarFilmeSalvo(id: string): Observable<any> {
    try {
      const watchLater = this.localStorageService.getWatchLater();
      const movie = watchLater.find(item => item.idBanco === id);
      if (movie) {
        this.localStorageService.removeFromWatchLater(movie.id);
      }
      return of({ success: true });
    } catch (error) {
      this.notificacao.showmessage("Erro ao excluir");
      console.error(error);
      return of({ success: false });
    }
  }
}