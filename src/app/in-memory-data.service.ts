import { Injectable } from '@angular/core';
import {Hero} from "./hero";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 11, name: 'Dr Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    return {heroes};
  }

// Remplace la méthode genId pour garantir qu'un héros a toujours un identifiant.
  // Si le tableau des héros est vide,
  // la méthode ci-dessous renvoie le nombre initial (11).
  // si le tableau des héros n'est pas vide, la méthode ci-dessous renvoie le plus haut
  // id héros + 1.
  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
  constructor() { }
}
