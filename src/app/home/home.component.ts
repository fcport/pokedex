import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  combineLatestAll,
  concatAll,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  Subscription,
  tap,
} from 'rxjs';
import { MovesResponse } from '../model/moves-response';
import { MyStat, Pokemon } from '../model/pokemon';
import { PokemonResponse, Stat, Type } from '../model/pokemon-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  URL: string = 'https://pokeapi.co/api/v2/pokemon/';

  sub?: Subscription;

  pokemon?: Pokemon;

  constructor(private api: HttpClient) {}

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe;
  }

  ngOnInit(): void {
    this.searchByNumber();
  }

  searchByNumber() {
    const num = Math.floor(Math.random() * 151) + 1;
    //console.log(num);
    const move$ = this.api
      .get<PokemonResponse>(this.URL + num)
      .pipe(
        concatMap((res) => this.api.get<MovesResponse>(res.moves[0].move.url))
      );
     const pokemon$ =  this.api
     .get<PokemonResponse>(this.URL + num);

     combineLatest([pokemon$, move$]).subscribe((res) => {
        const types: string[] = res[0].types.map((type: Type) => type.type.name);

        const stats: MyStat[] = res[0].stats.map((stat: Stat) => {
          return { name: stat.stat.name, value: stat.base_stat };
        });

        this.pokemon = new Pokemon(
          res[0].id,
          res[0].name,
          res[0].sprites.front_default,
          types,
          stats,
          [{ name: 'dsds' }]
          
        );
      });
  }
}
