import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, IonIcon, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/intefaces';
import { catchError, finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonBadge, IonIcon, IonLabel, IonAlert, IonSkeletonText, IonAvatar, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonList, DatePipe, RouterModule],
})
export class HomePage {

  private movieService = inject(MovieService)
  private currentPage = 1;
  protected erro = null;
  protected isLoanding = false;
  protected movies: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    if(!event){
      this.isLoanding = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoanding = false;
        if(event){
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log(err)

        this.erro = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: res => {
        console.log(res)
        this.movies.push(...res.results)
        if(event){
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    })
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
}
