import { Component, OnInit, Input } from '@angular/core';
import { InfoRequestService } from '../info-request.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CompanyNews } from '../format';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './news-modal-template.html',
})
export class NgbdModalContent {
  @Input() source! : string;
  @Input() date! : string;
  @Input() title! : string;
  @Input() summary! : string;
  @Input() url! : string;
  @Input() fbSrc! : string;
  @Input() twSrc! : string;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.css']
})
export class TopnewsComponent implements OnInit {

  constructor(
    public infoService : InfoRequestService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(item : CompanyNews) {
    // window.alert(s);
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.source = item.source;
    var date = new Date(item.datetime * 1000);
    modalRef.componentInstance.date = date.toLocaleDateString();
    modalRef.componentInstance.title = item.headline;
    modalRef.componentInstance.summary = item.summary;
    modalRef.componentInstance.url = item.url;
    modalRef.componentInstance.fbSrc =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(item.url) +
      '&amp;src=sdkpreparse';
    modalRef.componentInstance.twSrc = 'https://twitter.com/intent/tweet?text=' + item.headline + '&url=' + encodeURIComponent(item.url);
  }

}
