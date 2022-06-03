import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BetterArrayPipe } from './utils/better-array.pipe';
import { ReplacePipe } from './utils/replace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonComponent,
    ReplacePipe,
    BetterArrayPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
