import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private service: SharedService){}

  ngOnInit(): void{
    this.service.refreshNeeded$
    .subscribe(()=>{
      this.getAllSongs();
    })
    this.getAllSongs();
  }

  Playlist: any=[];
  ModalTitle:string;
  ActiveUploadMusicComp:boolean = false;
  music: any;
  path: string='http://localhost:61318/resources/music/';
  fullPath: string;

  private getAllSongs(){
    this.service.getPlaylist().subscribe(data=>{
      this.Playlist=data;
    });
  }

  addClick(){
    this.music={
      SongId:0,
      SongName:"",
      ArtistName:"",
      Url:""
    };
    this.ModalTitle="Upload Music";
    this.ActiveUploadMusicComp=true;
  }

  closeClick(){
    this.ActiveUploadMusicComp=false;
    this.getAllSongs();
  }

  editClick(item){
    this.music=item;
    this.ModalTitle="Edit Music";
    this.ActiveUploadMusicComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure?')){
      this.service.deleteMusic(item.SongId).subscribe(data=>{
        alert(data.toString());
        this.getAllSongs();
    })
    }
    }
  audioObj = new Audio();

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ]

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;

  streamObserver(url){
    return new Observable(observer => {
      this.audioObj.src =url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event)=>{
        console.log(event);
        this.seek = this.audioObj.currentTime;
        this.duration = this.timeFormat(this.audioObj.duration);
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
      }

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;

        this.removeEvent(this.audioObj, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj, events, handler){
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj, events, handler){
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  setSeekTo(event){
    this.audioObj.currentTime = event.target.value;
  }

  setVolume(event){
    this.audioObj.volume = event.target.value;
    console.log(event.target.value);
  }

  openFile(url){
    this.fullPath = this.path+url;
    this.streamObserver(this.fullPath).subscribe(event => {});
  }

  play(){
    this.audioObj.play();
  }
  pause(){
    this.audioObj.pause();
  }
  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }
  timeFormat(time, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
