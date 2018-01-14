import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  constructor(private heroService: HeroService) {
    //generalmente, en el constructor no debe haber más que asignaciones de parámetros a propiedades.
    //si se quiere traer datos de un server, hacerlo en ngOnInit().
   }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  //esta versión de getHeroes() espera a tener el observable para emitir el arreglo de héroes.
  //es una petición asincrónica, en orden al modo de operar de los servidores.
  getHeroes(): void {
    this.heroService.getHeroes()
                    .subscribe(heroes => this.heroes = heroes);
  }
}
