import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';
import { AlertService, Alert } from '../alert.service';

@Component({
  selector: 'app-companydescription',
  templateUrl: './companydescription.component.html',
  styleUrls: ['./companydescription.component.css']
})
export class CompanydescriptionComponent implements OnInit {

  selected = false;

  constructor(
    public info_service : InfoRequestService,
    private alertService : AlertService
  ) { }

  ngOnInit(): void {
  }

  changeSelected() {
    this.selected = !this.selected;
    var alert : Alert = {
      type: 'success',
      message: ''
    }
    if (this.selected) {
      alert.message = `${this.info_service.conpmay_description.ticker} added to Watchlist.`;
    }
    else {
      alert.type = 'danger';
      alert.message = `${this.info_service.conpmay_description.ticker} removed from Watchlist.`;
    }
    this.alertService.addAlert(alert);
  }

}
