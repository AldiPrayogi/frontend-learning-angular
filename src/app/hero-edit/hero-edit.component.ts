import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {

  constructor(
    private heroDetail: HeroDetailComponent,
    private heroService: HeroService,
    private typeService: TypeService,
    ) {
  }
  @Input() heroTemp?: Hero;
  editable?: boolean;
  @Input() typesTemp?: any;
  public typeTemp: any;

  save(): void {
    if (this.heroTemp && this.typesTemp) {
      const selectedType = this.typesTemp.find((type: { name: any; }) => type.name === this.typeTemp);
      this.heroTemp.type = {
        id: selectedType.id,
        name: selectedType.name,
      };
      this.heroService.updateHero(this.heroTemp).subscribe(() => {
        this.heroDetail.getHero();
        this.heroDetail.changeEditMode();
      });
    }
  }

  getTypes(): void {
    this.typeService.getTypes().subscribe((types) => {
      this.typesTemp = types;
    });
  }

  cancel(): void {
    this.heroDetail.changeEditMode();
    this.heroDetail.getHero();
  }

  ngOnInit(): void {
    this.heroTemp = this.heroDetail.hero;
    this.editable = this.heroDetail.editable;
    this.getTypes();
    if(this.heroTemp) {
      this.typeTemp = this.heroTemp.type.name;
    }
  }
}
