import { Component } from '@angular/core';
import { Catalogs } from '../services/service.catalogs'
import { delay } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css', '../styles/general.css'],
  providers: [ Catalogs]
})
export class ShowsComponent  {
  public shows : any[];
  public lengthShows:any = 'await'
  public startShow:number=0;
  public endShow:number=10;

  public spinner = {
    off:true
  }
  constructor(public allShows:Catalogs) { 
    this.allShows.getAllShows().pipe(delay(500)).subscribe(resp=>{
      this.shows = resp;
    }, (err)=>{return err}, ()=>{this.spinner.off=false; this.lengthShows = (this.shows.length/10)})
  }

  public nextPage(){
    

    if (this.endShow < this.shows.length ){

      this.spinner.off=true;
      this.startShow+=10;
      this.endShow += 10;
      
      timer(800).subscribe(()=>{
        this.spinner.off=false;

      })
    }
  }

  public backPage(){
   
    if (this.startShow > 0 ){
       this.spinner.off=true;
      this.startShow-=10;
      this.endShow -= 10;
      
      timer(100).subscribe(()=>{
        this.spinner.off=false;

      })
    }
  }
 
}
