import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoRequestService } from './info-request.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockSearch';
  public isMenuCollapsed = true;
  // routeParams = this.route.snapshot.paramMap;
  // this.infoService. routeTicker = String(this.routeParams.get('ticker'));
  constructor(
    private route: ActivatedRoute,
    public infoService : InfoRequestService,
    public location : Location
    ) {
      // console.log(`current location: ${this.location.path()}`);
      // console.log(`current url: ${this.route.url}`);
      // var routeParams = route.snapshot.paramMap;
      // this.infoService.routeTicker = String(routeParams.get('ticker'));
      // console.log(`route ticker: ${this.infoService.routeTicker}`);
      // if (this.infoService.routeTicker != 'home') {
      //   this.infoService.onSubmit(this.infoService.routeTicker);
      // }
    }

  // ngOnInit() {
  //   // console.log(`current location: ${this.location.path()}`);
  //   // console.log(`current url: ${this.route.url}`);
  //   // var routeParams = this.route.snapshot.paramMap;
  //   var cur_path = this.location.path().toString();
  //   console.log(cur_path);
  //   this.infoService.routeTicker = cur_path.split('/')[2];
  //   console.log(`route ticker: ${this.infoService.routeTicker}`);
  //   if (this.infoService.routeTicker != 'home') {
  //     this.infoService.onSubmit(this.infoService.routeTicker);
  //   }
  // }
}
