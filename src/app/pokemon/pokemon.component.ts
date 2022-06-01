import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
   @Input() pokemon?: Pokemon;
  isCollapsed: boolean = true;
  isCollapsed2: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
