import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MovesResponse } from '../model/moves-response';
import { Moves, Pokemon } from '../model/pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon?: Pokemon;
  @Output() arrowClicked = new EventEmitter<string>();

  isCollapsed: boolean = false;
  isCollapsed2: boolean = false;

  moveSelectedInfos?: Observable<MovesResponse>;

  selectedMove?: Moves;

  constructor(private pkmService: PokemonService) {}

  ngOnInit(): void {}

  onSelectMove(selectedMove: Moves) {
    this.moveSelectedInfos = this.pkmService.searchMove(selectedMove.url);
  }
  previousPokemon() {
    this.arrowClicked.emit('prev');
  }
  nextPokemon() {
    this.arrowClicked.emit('next');
  }
}
