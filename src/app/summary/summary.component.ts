import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(
    public infoService : InfoRequestService
  ) { }

  ngOnInit(): void {
  }

  // getLineColor() {
  //   if (this.infoService.company_latest_price.d > 0) {
  //     return 'green';
  //   }
  //   else {
  //     return 'red';
  //   }
  // }

  // Highcharts: typeof Highcharts = Highcharts;
  // chartOptions: Highcharts.Options = {
  //   title: {
  //     text: this.infoService.conpmay_description.ticker + ' Hourly Price Variation'
  //   },
  //   xAxis: {
  //       type: 'datetime',
  //       dateTimeLabelFormats: { // don't display the dummy year
  //           month: '%e. %b',
  //           year: '%b'
  //       },
  //   },
  //   series: [{
  //     data: [[1631022300000, 2], [1631022360000, 3], [1631022420000, 4]],
  //     type: 'line',
  //     color: this.getLineColor()
  //   }]
  // };
}
