import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons, IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonLabel, IonText, IonItem, IonIcon } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/intefaces';
import { cashOutline, calendarOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonText, IonLabel, IonCardContent, IonCardSubtitle, IonCard, IonCardTitle, IonCardHeader, IonButtons, IonBackButton, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DatePipe, CurrencyPipe]
})
export class DetailsPage{
  private movieService = inject(MovieService);
  protected imageBaseUrl = 'https://image.tmdb.org/t/p';
  protected movie: WritableSignal<MovieResult | null> = signal(null);

  @Input() set id(movieId:string){
    this.movieService.getMoviesDetails(movieId).subscribe(movie => {
      this.movie.set(movie);
    })
  }

  constructor() { 
    addIcons({cashOutline, calendarOutline});
  }

}
