import { Component, OnInit } from '@angular/core';
import { MoviesServices } from './service/MoviesServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  searchQuery = '';
  searchResults: any[] = [];
  likedMovies: Set<number> = new Set<number>();
  favMoviers: number[] = [];
  arrayOfFavMovies: any[] = [];
  constructor(private moviesService: MoviesServices) {}

  ngOnInit() {}

  searchMovies() {
    if (this.searchQuery.trim() !== '') {
      this.moviesService.searchMovies(this.searchQuery).subscribe((data) => {
        console.log(data);
        this.searchResults = data.results;
      });
    }
  }

  likeMovie(movie: any) {
    // Ajoutez ou retirez l'id du film de l'ensemble des films aimés
    if (this.likedMovies.has(movie.id)) {
      this.likedMovies.delete(movie.id);
    } else {
      this.likedMovies.add(movie.id);
    }
  }

  isMovieLiked(movieId: number): boolean {
    return this.likedMovies.has(movieId);
  }

  addMovieToFav(movieId: number) {
    if (movieId && !this.favMoviers.includes(movieId)) {
      this.favMoviers.push(movieId);
      localStorage.setItem('favorite_movie', JSON.stringify(this.favMoviers));
    } else if (this.favMoviers.includes(movieId)) {
      this.favMoviers = this.favMoviers.filter((id) => id !== movieId);
    }
  }

  isFav(movieId: number): boolean {
    return this.favMoviers.includes(movieId);
  }

  showFav() {
    let showFav = localStorage.getItem('favorite_movie');
    if (showFav) {
      showFav = showFav.replace('[', '');
      showFav = showFav.replace(']', '');
      const moviesIdArray = showFav.split(',');
      moviesIdArray.forEach((id) => {
        this.favMoviers.push(Number(id));
        this.moviesService.findMoviesById(Number(id)).subscribe((res) => {
          console.log(res);
          this.arrayOfFavMovies.push(res);
        });
      });
    }

    // showFav.forEach((id) => {});
    // this.moviesService.findMoviesById();
  }
}
