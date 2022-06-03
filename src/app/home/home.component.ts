import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Subscription
} from 'rxjs';
import { Ability, Moves, MyStat, Pokemon } from '../model/pokemon';
import { PokemonResponse, Stat, Type } from '../model/pokemon-response';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  URL: string = 'https://pokeapi.co/api/v2/pokemon/';
  @ViewChild('searchQuery') searchQuery ?: ElementRef;
  error?: {code: number, value: string};

  sub?: Subscription;

  pokemon?: Pokemon;

  constructor(private api: HttpClient, private pkmService: PokemonService) {}

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe;
  }

  ngOnInit(): void {
    this.sub = this.pkmService.pokemon.subscribe(pkm => this.pokemon = pkm)
    this.pkmService.searchPokemon(Math.floor(Math.random() * 151) + 1);
  }

  searchPokemon(){ 
    console.log(this.searchQuery?.nativeElement.value);
    this.pkmService.searchPokemon(this.searchQuery?.nativeElement.value)
  }

  randomPokemon(){
    this.pkmService.searchPokemon(Math.floor(Math.random() * 151) + 1);
  }
 
}
