import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';

@Component({
  selector: 'app-companylatestprice',
  templateUrl: './companylatestprice.component.html',
  styleUrls: ['./companylatestprice.component.css']
})
export class CompanylatestpriceComponent implements OnInit {

  price_color = 'red';

  constructor(
    public infoService : InfoRequestService
  ) { }

  ngOnInit(): void {
  }

  convertUnixTimeToDate (time : number) {
    // console.log(time);
    var t = new Date(time * 1000);
    // var s = t.toLocaleDateString("en-US") + ' ' + t.toLocaleTimeString("en-US");
    // var s = t.toDateString();
    var month = t.getMonth() + 1;
    var s = t.getFullYear() + '-' + month + '-' + t.getDate();
    // s = t.toTimeString
    return s;
  }

  convertUnixTimeToLocalTime(time : number) {
    var t = new Date(time * 1000);
    var s = t.getUTCHours() + ':' + t.getUTCMinutes() + ':' + t.getUTCSeconds();
    return s;
  }

  getPriceColor() {
    if (this.infoService.company_latest_price.d > 0) {
      return 'green';
    }
    else {
      return 'red';
    }
  }

  getUpDownArrow() {
    if (this.infoService.company_latest_price.d > 0) {
      return '../../assets/GreenArrowUp.png';
    }
    else {
      return '../../assets/RedArrowDown.png';
    }
  }

}
