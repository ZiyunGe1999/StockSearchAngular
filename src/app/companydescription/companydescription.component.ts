import { Component, OnInit, Input } from '@angular/core';
import { InfoRequestService } from '../info-request.service';
import { AlertService, Alert } from '../alert.service';
import { WatchService } from '../watch.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'trade-ngbd-modal-content',
  templateUrl: './trade-modal-template.html',
})
export class NgbdModalContent {
  @Input() ticker! : string;
  @Input() price! : number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
    ) {}

    quantityForm = this.formBuilder.group({
      quant: 0
    });
}


@Component({
  selector: 'app-companydescription',
  templateUrl: './companydescription.component.html',
  styleUrls: ['./companydescription.component.css']
})
export class CompanydescriptionComponent implements OnInit {

  constructor(
    public info_service : InfoRequestService,
    private alertService : AlertService,
    private watchService : WatchService,
    private modalService: NgbModal
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

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.ticker = this.info_service.conpmay_description.ticker;
    modalRef.componentInstance.price = this.info_service.company_latest_price.c;
  }

}
