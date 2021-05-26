import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://localhost:61318/api";
readonly MusicUrl = "http://localhost:61318/resources/music";

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getPlaylist():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/music');
  }

  addMusic(val:any){
    return this.http
    .post(this.APIUrl+'/music',val)
    .pipe(
      tap(() =>{
        this._refreshNeeded$.next();
      })
    );
  }

  updateMusic(val:any){
    return this.http.put(this.APIUrl+'/music',val);
  }

  deleteMusic(val:any){
    return this.http.delete(this.APIUrl+'/music/'+val);
  }

  UploadMusic(val:any){
    return this.http.post(this.APIUrl+'/Playlist/SaveFile',val);
  }
}
