import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private currentUser = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUser.asObservable();

  constructor() {
    this.initializeDefaultUser();
  }

  private initializeDefaultUser(): void {
    if (!this.getCurrentUser()) {
      const defaultUser: User = {
        uid: 'default-user',
        email: 'usuario@exemplo.com',
        senha: '',
        displayName: 'Usuário',
        photoURL: '/assets/img/1000_F_477056624_XAKvgSV5jgHHDEOyoyBAuOuPBJYySzHR (2).jpg'
      };
      this.setCurrentUser(defaultUser);
    }
  }

  // User management
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }

  updateUser(user: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user };
      this.setCurrentUser(updatedUser);
    }
  }

  // Favorites management
  getFavorites(): FilmeLista[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(movie: FilmeLista): void {
    const favorites = this.getFavorites();
    const exists = favorites.find(fav => fav.id === movie.id);
    if (!exists) {
      movie.idBanco = this.generateId();
      movie.isFavorite = true;
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  removeFavorite(movieId: number): void {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(fav => fav.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(filtered));
  }

  updateFavorite(movie: FilmeLista): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === movie.id);
    if (index !== -1) {
      favorites[index] = movie;
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  // Watch later management
  getWatchLater(): FilmeLista[] {
    const watchLater = localStorage.getItem('watchLater');
    return watchLater ? JSON.parse(watchLater) : [];
  }

  addToWatchLater(movie: FilmeLista): void {
    const watchLater = this.getWatchLater();
    const exists = watchLater.find(item => item.id === movie.id);
    if (!exists) {
      movie.idBanco = this.generateId();
      movie.isSave = true;
      watchLater.push(movie);
      localStorage.setItem('watchLater', JSON.stringify(watchLater));
    }
  }

  removeFromWatchLater(movieId: number): void {
    const watchLater = this.getWatchLater();
    const filtered = watchLater.filter(item => item.id !== movieId);
    localStorage.setItem('watchLater', JSON.stringify(filtered));
  }

  updateWatchLater(movie: FilmeLista): void {
    const watchLater = this.getWatchLater();
    const index = watchLater.findIndex(item => item.id === movie.id);
    if (index !== -1) {
      watchLater[index] = movie;
      localStorage.setItem('watchLater', JSON.stringify(watchLater));
    }
  }

  // Watched movies management
  getWatched(): FilmeLista[] {
    const watched = localStorage.getItem('watched');
    return watched ? JSON.parse(watched) : [];
  }

  markAsWatched(movie: FilmeLista): void {
    const watched = this.getWatched();
    const exists = watched.find(item => item.id === movie.id);
    if (!exists) {
      movie.assistido = true;
      movie.idBanco = this.generateId();
      watched.push(movie);
      localStorage.setItem('watched', JSON.stringify(watched));
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}