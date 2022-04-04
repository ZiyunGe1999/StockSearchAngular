import { Component, OnInit } from '@angular/core';
import { WatchService } from '../watch.service';
import { Location } from '@angular/common';
import { InfoRequestService } from '../info-request.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(
    public watchService : WatchService,
    private location : Location,
    public infoService : InfoRequestService
  ) { }

  ngOnInit() {
    var cur_path = this.location.path().toString();
    // this.infoService.getWatchListPrice()
    // this.infoService.watchlist_price = {};
    var watchlist = this.watchService.getWatchList()
    for (let item of watchlist) {
      this.infoService.getWatchListPrice(item);
    }
    this.location.go(cur_path);
  }

  getWatchListInfo() {
    var stickers = this.watchService.getWatchList();
    for (let s of stickers) {

    }
  }

  getUpDownArrow(ticker : string) {
    if (this.infoService.watchlist_price[ticker][1] > 0) {
      return '../../assets/GreenArrowUp.png';
    }
    else {
      return '../../assets/RedArrowDown.png';
    }
  }

  getPriceColor(ticker : string) {
    if (this.infoService.watchlist_price[ticker][1] > 0) {
      return 'green';
    }
    else {
      return 'red';
    }
  }

}
