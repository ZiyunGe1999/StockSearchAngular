import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  constructor(
    public infoService : InfoRequestService
  ) { }

  ngOnInit(): void {
  }

}
