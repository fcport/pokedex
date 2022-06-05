import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  map,
  Observable, Subject
} from 'rxjs';
import { MovesResponse } from '../model/moves-response';
import { Ability, Moves, MyStat, Pokemon } from '../model/pokemon';
import { PokemonResponse, Stat, Type } from '../model/pokemon-response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon: Subject<Pokemon> = new Subject<Pokemon>();
  error: Subject<{ code: number; value: string }> = new Subject<{
    code: number;
    value: string;
  }>();
  constructor(private http: HttpClient) {}

  pokemonURL = 'https://pokeapi.co/api/v2/pokemon/';

  searchPokemon(searchQuery: number | string) {
    this.http
      .get<PokemonResponse>(this.pokemonURL + searchQuery)
      .pipe(
        map((res) => {
          const types: string[] = res.types.map((type: Type) => type.type.name);

          const stats: MyStat[] = res.stats.map((stat: Stat) => {
            return { name: stat.stat.name, value: stat.base_stat };
          });

          const moves: Moves[] = res.moves
            .filter((currMove) => {
              return (
                currMove.version_group_details.filter(
                  (ver) => ver.level_learned_at !== 0
                ).length > 0
              );
            })
            .map((rawMove) => rawMove.move);

          const abilities: Ability[] = res.abilities.map((ab) => ab.ability);

          return new Pokemon(
            res.id,
            res.name,
            res.sprites.front_default,
            types,
            stats,
            moves,
            abilities
          );
        })
      )
      .subscribe({
        next: (res) => {
          console.log('>>>> pokemon from http sub');
          this.pokemon.next(res as Pokemon);
        },
        error: (err) => {
          console.log('>>>> error from http sub');
          this.error.next({ code: err.status, value: err.error });
        },
      });
  }

  searchMove(url: string): Observable<MovesResponse> {
    return this.http.get<MovesResponse>(url);
  }
}
