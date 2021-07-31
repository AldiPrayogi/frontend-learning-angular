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
  private BASEURL = 'http://localhost:3000/api/v1/heroes';

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
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

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.BASEURL)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.BASEURL}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero by ID=${id}`)),
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(`${this.BASEURL}/${hero.heroID}`, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.heroID}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }
}
