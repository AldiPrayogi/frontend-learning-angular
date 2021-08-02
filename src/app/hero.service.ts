import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private HERO_URL = 'http://localhost:3000/api/v1/heroes';

  private log(response: any){
    this.messageService.add(`HeroService: ${response.message}`);
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(offset: number): Observable<any> {
    return this.http.get<Hero[]>(`${this.HERO_URL}?offset=${offset}`)
      .pipe(
        tap(() => {
          const messageResponse = {
            message: 'Fetched Heroes',
          };
          this.log(messageResponse);
        }),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.HERO_URL}/${id}`)
      .pipe(
        tap(() => {
          const messageResponse = {
            message: `fetched hero by ID=${id}`,
          };
          this.log(messageResponse);
        }),
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(`${this.HERO_URL}/${hero.id}`, hero, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        catchError(this.handleError<any>('updateHero'))
      );
  };

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.HERO_URL, hero, this.httpOptions)
      .pipe(
        tap((response: any) => {
          const messageResponse = {
            message: `added hero with hero name=${response.createdHero.name}`,
          };
          this.log(messageResponse);
        }),
        catchError(this.handleError<Hero>('addHero'))
      );
  };

  deleteHero(id: string): Observable<any> {
    const url = `${this.HERO_URL}/${id}`;

    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        catchError(this.handleError<Hero>('deletedHero'))
      );
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }
}
