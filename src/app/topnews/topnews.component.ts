import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';

@Component({
  selector: 'app-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.css']
})
export class TopnewsComponent implements OnInit {

  constructor(
    public infoService : InfoRequestService
  ) { }

  ngOnInit(): void {
  }

  open(s : string) {
    window.alert(s);
  }

}
