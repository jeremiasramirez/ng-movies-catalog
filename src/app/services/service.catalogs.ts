import { Injectable } from "@angular/core";
import { ajax } from "rxjs/ajax"
import { pluck } from 'rxjs/operators';

@Injectable()


export class Catalogs {
  public httpUrl : string = "http://api.tvmaze.com/search/shows?q=";
  constructor(){
    ajax.get("http://api.tvmaze.com/schedule/full").pipe(pluck('response')).subscribe(data=>{
      console.log(data)
    })
  }
 
  getCatalogs(name:any= "comedy"){
    let urlLocal :string= this.httpUrl + name;
    return ajax.get(urlLocal).pipe(pluck('response'))
  }

  getOnlyShow(id:number=0){

    if ( id != 0 ){
      let urlLocal :string= "http://api.tvmaze.com/shows/" + id;
      return ajax.get(urlLocal).pipe(pluck('response'))
    }

  }
}
