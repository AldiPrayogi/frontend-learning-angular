import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { TypeService } from '../type.service';
import { Type } from '../type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private typeService: TypeService,
    public dialogRef: MatDialogRef<HeroCreateComponent>,
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

  add(): void {
    if(this.createdHero){
      this.createdHero.name = this.createdHero.name.trim();
      this.createdHero.type = this.selectedType;
      console.log(this.createdHero);
      this.dialogRef.close();
      this.heroService.addHero(this.createdHero)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  ngOnInit(): void {
    this.createdHero = {
      id: '',
      name: '',
      level: 1,
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
      type: new FormControl(this.selectedType.name),
    });

    this.getTypes();
  }
}
