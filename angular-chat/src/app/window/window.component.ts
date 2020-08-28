import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { map,switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  channelName:Observable<string>=of('Welcome')
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
   this.channelName= this.route.url.pipe(map(
      (value)=>{
        if(value && value[0])
          return value[0].path
        else
          return 'Welcome'
      }
    ),    
   )
  }


}
