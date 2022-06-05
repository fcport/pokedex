import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { catchError, of, retry, Subscription, tap, throwError } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  URL: string = 'https://pokeapi.co/api/v2/pokemon/';
  @ViewChild('searchQuery') searchQuery?: ElementRef;
  error?: { code: number; value: string };

  loading: boolean = false;

  sub?: Subscription;
  errorFromService?: Subscription;

  pokemon?: Pokemon;

  constructor(private api: HttpClient, private pkmService: PokemonService) {}

  ngOnDestroy(): void {
    if (!!this.sub) this.sub.unsubscribe();
    if (!!this.errorFromService) this.errorFromService.unsubscribe();
  }

  ngOnInit(): void {
    //this.sub = this.pkmService.pokemon.subscribe((pkm) => (this.pokemon = pkm));
    this.errorFromService = this.pkmService.error.subscribe((err) => {
      this.loading = false;
      this.catchErr(err.code, err.value);
    });

    this.sub = this.pkmService.pokemon.subscribe({
      next: (pkm) => {
        console.log('>>>> pkm');
        this.pokemon = pkm as Pokemon;
        this.loading = false;
      },
    });

    this.pkmService.searchPokemon(Math.floor(Math.random() * 151) + 1);
  }

  searchPokemon() {
    this.loading = true;
    this.error = undefined;
    if (this.searchQuery?.nativeElement.value === '') {
      this.error = { code: 0, value: 'Insert valid pokemon name or number' };
      this.loading = false;
      return;
    }
    this.pkmService.searchPokemon(this.searchQuery?.nativeElement.value);
  }

  randomPokemon() {
    this.loading = true;
    this.error = undefined;
    this.pkmService.searchPokemon(Math.floor(Math.random() * 151) + 1);
  }

  catchErr(status: number, errorMsg: string) {
    this.error = undefined;
    switch (status) {
      case 404:
        this.error = {
          code: status,
          value: "Can't find the pokemon you asked for!",
        };
        break;

      default:
        this.error = {
          code: status,
          value: 'An error occurred: ' + errorMsg,
        };
        break;
    }
  }

  changePokemon(prevOrNext: string) {
    this.loading = true;
    this.error = undefined;
    this.pkmService.searchPokemon(
      prevOrNext === 'prev'
        ? this.pokemon!.number - 1
        : this.pokemon!.number + 1
    );
  }

}
