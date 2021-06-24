import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  brandImages: Array<Object> = new Array();
  menImages: Array<Object> = new Array();
  womenImages: Array<Object> = new Array();

  constructor(public router: Router) { 
    
  }

  ngOnInit(): void {
    for(let i=1; i<=8; i++){
      let imageObj:Object;
      imageObj = {
        imageId: ("brands"+i),
        imageUrl: ("../../assets/brands/brands" + i + ".jpg"),
        imageAlt: ("brands"+i)
      }
      this.brandImages.push(imageObj);
    }
    for(let i=1; i<=6; i++){
      let imageObj:Object;
      imageObj = {
        imageId: ("men"+i),
        imageUrl: ("../../assets/men/men" + i + ".jpg"),
        imageAlt: ("men"+i)
      }
      this.menImages.push(imageObj);
    }
    for(let i=1; i<=6; i++){
      let imageObj:Object;
      imageObj = {
        imageId: ("women"+i),
        imageUrl: ("../../assets/women/women" + i + ".jpg"),
        imageAlt: ("women"+i)
      }
      this.womenImages.push(imageObj);
    }
  }

  homePageImageClicked(id: string, category: string): void{
    let brands = ["PUMA", "HRX", "US POLO ASSN", "MANGO", "JACK & JOHNS", "ANOUK", "WROGN", "VISUDH"];
    console.log(`clicked image id ${id} for category ${category}`);
    if(category == "men"){
      this.router.navigateByUrl('/categories/men');
    }else if(category == "women"){
      this.router.navigateByUrl('/categories/women');
    }else if(category == "kid"){
      this.router.navigateByUrl('/categories/kid');
    }
    else{
      let brand = brands[parseInt(id.substr(6))-1];
      // console.log(id, id.substr(6), brand);
      this.router.navigateByUrl('/categories', {state: {brand}});
    }
  }
}
