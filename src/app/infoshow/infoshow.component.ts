import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';

@Component({
  selector: 'app-infoshow',
  templateUrl: './infoshow.component.html',
  styleUrls: ['./infoshow.component.css']
})
export class InfoshowComponent implements OnInit {

  constructor(
    public infoService : InfoRequestService
  ) { }

  ngOnInit(): void {
  }

  getOpenCloseColor() {
    var cur_time = Date.now().valueOf() / 1000;
    console.log('current time: ' + cur_time);
    if (cur_time - this.infoService.company_latest_price.t > 20) {
      return 'red';
    }
    else {
      return 'greed';
    }
  }

  getOpenCloseText() {
    var cur_time = Date.now().valueOf() / 1000;
    console.log('current time: ' + cur_time);
    if (cur_time - this.infoService.company_latest_price.t > 20) {
      var t = new Date(this.infoService.company_latest_price.t * 1000);
      var month = t.getMonth() + 1;
      return 'Market Closed on ' + t.getFullYear() + '-' + month + '-' + t.getDate() + '  ' + t.getUTCHours() + ':' + t.getUTCMinutes() + ':' + t.getUTCSeconds();
    }
    else {
      return 'Market is Open';
    }
  }

}
