import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute, //se utiliza para obtener información del path. En este caso, el id del héroe.
    private location: Location, //sirve para interactuar con el browser, agregando un botón para ir hacia atrás en la navegación.
    private heroService: HeroService //del service se extrae la información del héroe en cuestión.
  ) {

   }

  ngOnInit() {
    this.getHeroe();
  }

  getHeroe(): void {
    const id = +this.route.snapshot.paramMap.get('id'); //con snapshot y paramMap extraemos el id del path.
    //el + convierte string en number, el tipo de dato del id de los héroes.
    this.heroService.getHero(id)
                    .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
                    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
