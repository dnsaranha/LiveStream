import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../Interfaces/user';
import { LocalStorageService } from './local-storage.service';
import { NotificationService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService,
    private notification: NotificationService
  ) { }

  public getCurrentUser(): Observable<User | null> {
    return of(this.localStorageService.getCurrentUser());
  }

  public listarUsuarios(): Observable<User[]> {
    const currentUser = this.localStorageService.getCurrentUser();
    return of(currentUser ? [currentUser] : []);
  }

  public editarUsuario(user: User): Observable<any> {
    try {
      this.localStorageService.updateUser(user);
      return of({ success: true });
    } catch (error) {
      this.notification.showmessage("Erro ao editar usuário");
      console.error(error);
      return of({ success: false });
    }
  }

  public logout(): Observable<any> {
    // In a local-only app, we don't actually log out
    // but we can show a message
    return of({ success: true });
  }
}