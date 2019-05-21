import { Component, OnInit } from '@angular/core';
import { FlickerService } from '../services/flicker.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private flickerService: FlickerService,
    private route: Router,
    private snackBar: MatSnackBar) { }
images;
p=1;
ratings;
  ngOnInit() {
    this.getImages();
    setTimeout(()=>{
    this.getRating();
  }, 2000)
    
  }

  getRating(){
    var totalRating =0;
      this.flickerService.ratingServicee.subscribe(res=>{
        if(res){
          this.images = res;
          this.images.photos.photo.forEach(ele=>{
            if(ele.ratings.length){
              console.log(ele, 'ele0')
              ele.ratings.forEach(ele1=>{
                console.log(totalRating, 'totRR')
                totalRating = ele1.rating + totalRating;
                console.log(ele1.rating, 'tot')
              })
              ele.totalRating = totalRating/ele.ratings.length;
              console.log(ele.totalRating, 'totEE')

            }
          })
          console.log(this.images, 'images')          
        }else{
          return;
        }
      })
  }

  getImages(){
    this.flickerService.getPhotos().subscribe(res=>{
      if(res['stat'] == 'ok'){
        this.snackBar.open('Loading Images','',{
          duration: 2000,
        });
        this.images = res
            this.images.photos.photo.forEach(ele=>{
              ele.ratings = [];
            })
            console.log(this.images, 'ele')
        
      }else{
        this.snackBar.open('Fetching Images Failed','', {
          duration: 2000,
        });
      }
    })
  }

  clicked(image){
    this.route.navigate(['/rating', image.id])
    this.flickerService.currentImg(this.images, image);
  }

}
