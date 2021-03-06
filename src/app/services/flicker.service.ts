import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickerService {

  constructor(private http: HttpClient) { }
key='daeeffc1a8aa8f65bd20c903b3b85172';
private imagesource = new BehaviorSubject('Nothing');
currentImage = this.imagesource.asObservable();
private ratingSource = new BehaviorSubject(null);
ratingServicee = this.ratingSource.asObservable();
  getPhotos(){
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this
      .key}&tags=food&per_page=48&format=json&nojsoncallback=1`;

     return this.http.get(url);
  }

  currentImg(images, image){
    var imagesz: any={
      images: images,
      image: image
    }
    this.imagesource.next(imagesz);
  }

  ratingService(images){
    this.ratingSource.next(images)
  }
  }
