import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';
import { AlertService, Alert } from '../alert.service';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-companydescription',
  templateUrl: './companydescription.component.html',
  styleUrls: ['./companydescription.component.css']
})
export class CompanydescriptionComponent implements OnInit {

  constructor(
    public info_service : InfoRequestService,
    private alertService : AlertService,
    private watchService : WatchService
  ) { }

  ngOnInit(): void {
  }

  changeSelected() {
    var alert : Alert = {
      type: 'success',
      message: ''
    }
    if (!this.isSelected()) {
      this.watchService.addWatch(this.info_service.conpmay_description.ticker, this.info_service.conpmay_description.name);
      alert.message = `${this.info_service.conpmay_description.ticker} added to Watchlist.`;
    }
    else {
      this.watchService.removeWatch(this.info_service.conpmay_description.ticker);
      alert.type = 'danger';
      alert.message = `${this.info_service.conpmay_description.ticker} removed from Watchlist.`;
    }
    this.alertService.addAlert(alert);
  }

  isSelected() {
    var ticker = this.info_service.conpmay_description.ticker
    return this.watchService.isInWatchlist(ticker);
  }

}
