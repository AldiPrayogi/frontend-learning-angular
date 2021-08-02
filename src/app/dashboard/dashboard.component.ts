import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes(0)
      .subscribe((response) => {
        const heroesCount = response.count;
        const max = Math.ceil(Math.random() * (heroesCount - 0));
        this.heroes = response.returnedHeroes.slice(0, max);
      });
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
