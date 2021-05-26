import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() music: any;
  SongId: string;
  SongName: string;
  ArtistName: string;
  Url: string;
  FullPath: string;

  ngOnInit(): void{
    this.SongId = this.music.SongId;
    this.SongName = this.music.SongName;
    this.ArtistName = this.music.ArtistName;
    this.Url = this.music.Url;
    this.FullPath = this.service.MusicUrl+this.Url;
  }

  addMusic(){
    var val = {SongId:this.SongId,
                SongName:this.SongName,
                ArtistName:this.ArtistName,
                Url:this.Url};
    this.service.addMusic(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  uploadMusic(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploaded file', file,file.name);

    this.service.UploadMusic(formData).subscribe((data:any)=>{
      this.Url=data.toString();
      this.FullPath=this.service.MusicUrl+this.Url;
    })
  }

  updateMusic(){
    var val = {SongId:this.SongId,
      SongName:this.SongName,
      ArtistName:this.ArtistName,
      Url:this.Url};
    this.service.updateMusic(val).subscribe(res=>{
    alert(res.toString());
});
  }
}
