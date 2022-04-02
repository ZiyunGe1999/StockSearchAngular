import { Injectable } from '@angular/core';
import { AutoCompleteInfo, CompanyDescription, CompanyLatestPrice, CompanyHistoricalData } from './format';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class InfoRequestService {

  autocomplete_infos = {} as AutoCompleteInfo;
  symbol_list : string[] = [];
  api_key = 'c87v1q2ad3iet0qj41mg';

  conpmay_description = {} as CompanyDescription;
  company_latest_price = {}  as CompanyLatestPrice;
  company_peers : string[] = [];
  ready = false;

  constructor(
    private http: HttpClient
  ) { }

  getLineColor() {
    if (this.company_latest_price.d > 0) {
      return 'green';
    }
    else {
      return 'red';
    }
  }

  updateFlag = false;
  sticker_changed = false;
  line_color_changed = false;
  price_chart_data = [[1631022300000, 2], [1631022360000, 3], [1631022420000, 4]];
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: this.conpmay_description.ticker + ' Hourly Price Variation'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
    },
    series: [{
      data: this.price_chart_data,
      type: 'line',
      color: this.getLineColor()
    }]
  };

  changeUpdateFlag() {
    if (this.sticker_changed && this.line_color_changed) {
      this.updateFlag = true;
      this.sticker_changed = false;
      this.line_color_changed = false;
    }
  }

  getAutoCompleteInfo(q : string) {
    if (typeof(q) != "undefined" && q.length > 1) {
      q = q.toUpperCase();
      var url = 'https://finnhub.io/api/v1/search?q=' + q + '&token=' + this.api_key;
      console.log(url);
      this.http.get<AutoCompleteInfo>(url).subscribe((data : AutoCompleteInfo) => this.autocomplete_infos = {
        count : data.count,
        result : data.result,
      });
      console.log("get response")
      this.symbol_list = [];
      for (let i = 0; i < this.autocomplete_infos.count; i++) {
        if (this.autocomplete_infos.result[i].type == "Common Stock" && this.autocomplete_infos.result[i].symbol.indexOf(".") == -1) {
          console.log(this.autocomplete_infos.result[i].symbol);
          this.symbol_list.push(this.autocomplete_infos.result[i].symbol);
        }
      }
    }
  }

  getCompnayDescription(q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var url = 'https://finnhub.io/api/v1/stock/profile2?symbol=' + q + '&token=' + this.api_key;
      console.log(url);
      this.http.get<CompanyDescription>(url).subscribe((data : CompanyDescription) => {
        this.conpmay_description = data;
        if (this.chartOptions.title) {
          this.chartOptions.title.text = this.conpmay_description.ticker + ' Hourly Price Variation';
          this.sticker_changed = true;
          this.changeUpdateFlag();
        }
      });
      console.log("getCompnayDescription response");
    }
  }

  getCompanyLatestPrice(q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var url = 'https://finnhub.io/api/v1/quote?symbol=' + q + '&token=' + this.api_key;
      console.log(url);
      this.http.get<CompanyLatestPrice>(url).subscribe((data : CompanyLatestPrice) => {
        this.company_latest_price = data;
        if (this.chartOptions.series){
          this.chartOptions.series[0].color = this.getLineColor();
          this.line_color_changed = true;
          this.changeUpdateFlag();
        }
      });
      console.log("getCompanyLatestPrice response");
    }
  }

  getCompanyPeers(q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var url = 'https://finnhub.io/api/v1/stock/peers?symbol=' + q + '&token=' + this.api_key;
      console.log(url);
      this.http.get<string []>(url).subscribe({
        next: data =>{
          this.company_peers=data
        }
      });
      console.log(this.company_peers);
      for (let item of this.company_peers) {
        console.log('peer: ' + item);
      }
      console.log("getCompanyPeers response");
    }
  }

  // getCompanyHistoricalData(q : string)
}
