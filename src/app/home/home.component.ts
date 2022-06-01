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
  switchMap,
  tap,
} from 'rxjs';
import { MovesResponse } from '../model/moves-response';
import { Ability, Moves, MyStat, Pokemon } from '../model/pokemon';
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

    const pokemon$ = this.api
      .get<PokemonResponse>(this.URL + num)
      .subscribe((res) => {
        const types: string[] = res.types.map((type: Type) => type.type.name);

        const stats: MyStat[] = res.stats.map((stat: Stat) => {
          return { name: stat.stat.name, value: stat.base_stat };
        });
        console.log(res);

        const moves: Moves[] = res.moves
          .filter((currMove) => {
            return (
              currMove.version_group_details.filter(
                (ver) => ver.level_learned_at !== 0
              ).length > 0
            );
          })
          .map((rawMove) => rawMove.move);

        const abilities : Ability[] = res.abilities.map(ab => ab.ability)

        this.pokemon = new Pokemon(
          res.id,
          res.name,
          res.sprites.front_default,
          types,
          stats,
          moves,
          abilities
        );
      });
  }
}
