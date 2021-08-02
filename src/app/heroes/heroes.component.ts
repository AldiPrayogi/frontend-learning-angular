import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { imageMap } from '../imageAsset';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  pageIndex: number = 0;
  heroes: Hero[] = [];
  private offset: number = 0;
  private totalHeroes: number = 0;

  displayedColumns: string[] = ['position', 'name', 'description', 'level', 'type'];

  constructor(private heroService: HeroService) {
  }

  getTotalHeroes(): number {
    return this.totalHeroes;
  }

  getHeroes(event?: any): void {
    if (event){
      console.log(event);
      this.pageIndex = event.pageIndex;
      console.log(this.pageIndex);
      this.offset = this.pageIndex*10;
    }
    this.heroService.getHeroes(this.offset)
      .subscribe((response) => {
        console.log(response);
        this.heroes = response.returnedHeroes;
        this.totalHeroes = response.count;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name){ return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((response: any) => {
        const createdHero = {
          name: response.createdHero.name,
          id: response.createdHero.id,
          description: response.createdHero.description,
          level: response.createdHero.level,
          type: response.createdHero.type,
          image: imageMap.get(response.createdHero.type.name),
        };
        this.heroes.push(createdHero);
      });
  }

  ngOnInit(): void {
    this.offset = 0;
    this.getHeroes();
  }

}
