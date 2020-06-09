import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
// import {HEROES} from '../mock-heroes';
import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = {
  // id: 1,
  //  name: 'Windstrom'
  // }

 // heroes = HEROES;
  // selectedHero: Hero;
  heroes: Hero[];


  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

//  onSelect(hero: Hero): void {
  //  this.selectedHero = hero;
  //  this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
 // }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    //la méthode trim() permet de retirer les blancs en début et fin de chaîne
    name = name.trim();
    // lorsque le nom n'est pas vide, le gestionaire crée un hero obj semblable au nom et le transmet à addHero() qui est une méthode de notre service
    if (!name) {return;}
    this.heroService.addHero({name} as Hero)
      //lorsque addHero() a réussi sa sauvegarde, le subscribe reçoit le nvx héro et le pousse dans la liste pour l'affichage
      .subscribe(hero => {
        this.heroes.push(hero);
      })

  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h ! == hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
