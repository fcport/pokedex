import { HttpClient } from '@angular/common/http';
import { Component, Input, ModuleWithProviders, OnInit } from '@angular/core';
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
  isCollapsed: boolean = false;
  isCollapsed2: boolean = false;

  moveSelectedInfos?: Observable<MovesResponse>;

  selectedMove?: Moves;

  constructor(private pkmService: PokemonService) {}

  ngOnInit(): void {}

  onSelectMove(selectedMove: Moves) {
    this.moveSelectedInfos = this.pkmService.searchMove(selectedMove.url);
  }
}
