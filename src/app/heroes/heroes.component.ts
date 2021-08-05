import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroCreateComponent } from '../hero-create/hero-create.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  private pageIndex: number = 0;
  loading = false;
  heroes: Hero[] = [];
  private pageSize: number = 10;
  private offset: number = 0;
  private totalHeroes: number = 0;

  displayedColumns: string[] = ['position', 'name', 'description', 'level', 'type'];

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    ) {
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(HeroCreateComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getHeroes();
    });
  }

  getPageIndex(): number {
    return this.pageIndex;
  }

  getTotalHeroes(): number {
    return this.totalHeroes;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getHeroes(event?: any): void {
    if (event){
      this.pageIndex = event.pageIndex;
      this.offset = this.pageIndex*10;
    }
    this.heroService.getHeroes(this.offset)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((response) => {
        this.heroes = response.returnedHeroes;
        this.totalHeroes = response.count;
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.offset = 0;
    this.getHeroes();
  }

}
