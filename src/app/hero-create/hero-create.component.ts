import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { imageMap } from '../imageAsset';
import { HeroService } from '../hero.service';
import { TypeService } from '../type.service';
import { Type } from '../type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private typeService: TypeService,
  ) { }

  @Input() createdHero?: Hero;
  fetchedTypes?: Type[];
  public selectedType: any;
  public heroForm: any;

  getTypes(): void {
    this.typeService.getTypes().subscribe((types) => {
      this.fetchedTypes = types;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name){ return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  ngOnInit(): void {
    this.createdHero = {
      id: '',
      name: '',
      level: 0,
      image: '',
      description: '',
      type: {
        id: '',
        name: ''
      }
    };
    this.selectedType = '';

    this.heroForm = new FormGroup({
      name: new FormControl(this.createdHero.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      level: new FormControl(this.createdHero.level, [
        Validators.required,
      ]),
      description: new FormControl(this.createdHero.description, [
        Validators.required,
      ]),
    });

    this.getTypes();
  }
}
