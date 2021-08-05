import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { imageMap } from '../imageAsset';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  public heroTemp?: Hero;
  public editable: boolean = false;
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) {}

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).subscribe((hero) => {
      hero.image = <string>imageMap.get(hero.type.name);
      this.hero = hero;
      this.heroTemp = hero;
    });
  }

  changeEditMode(): void {
    this.editable = !this.editable;
    this.heroTemp = this.hero;
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getHero();
  }

}
