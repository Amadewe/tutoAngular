import {Injectable} from '@angular/core';
import {Hero} from './hero';
//import { HEROES } from './mock-heroes';
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  };

  private heroesUrl = 'api/heroes';

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  constructor(
    private messageService: MessageService,
    // on injecte le client HttpClient
    private http: HttpClient) {
  }
  getHeroes(): Observable<Hero[]> {
    // return of(HEROES);

    //Http.get() renvoie le corps de la réponse en tant qu'objet JSON non typé par défaut
    //L'application du spécificateur de type facultatif <Hero[]>, ajoute des fonctionnalités TypeScript, qui réduisent les erreurs lors de la compilation.
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        //tap enregistre l'opération
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`HeroService: fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=¤{id`))
    );
    // return of(HEROES.find(hero => hero.id === id));
    // return this.http.get<Hero[]>(this.heroesUrl);

  }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero,
      this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}
