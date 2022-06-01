import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Moves, Pokemon } from '../model/pokemon';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  @Input() pokemon?: Pokemon;
  isCollapsed: boolean = true;
  isCollapsed2: boolean = true;

  selectedMove?: Moves;

  constructor(private pkmService: PokemonService) {}

  ngOnInit(): void {}

  onSelectMove(selectedMove: Moves) {
    this.pkmService.searchMove(selectedMove.url);
  }
}
