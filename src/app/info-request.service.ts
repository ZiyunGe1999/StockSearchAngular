import { Injectable } from '@angular/core';
import { AutoCompleteInfo, CompanyDescription, CompanyLatestPrice, CompanyHistoricalData, CompanyNews } from './format';
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
  company_historical_data = {}  as CompanyHistoricalData;
  list_company_news : CompanyNews[] = [];
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
  chart_data_changed = false;
  price_chart_data = [[1631022300000, 2], [1631022360000, 3], [1631022420000, 4]];
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: this.conpmay_description.ticker + ' Hourly Price Variation'
    },
    yAxis: {
      title: {
        text: 'USD'
      }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
        },
    },
    series: [{
      name: this.conpmay_description.ticker,
      data: this.price_chart_data,
      type: 'line',
      color: this.getLineColor()
    }]
  };

  changeUpdateFlag() {
    if (this.sticker_changed && this.line_color_changed && this.chart_data_changed) {
      this.updateFlag = true;
      this.sticker_changed = false;
      this.line_color_changed = false;
      this.chart_data_changed = false;
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
          if (this.chartOptions.series) {
            this.chartOptions.series[0].name = this.conpmay_description.ticker;
          }
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
        this.company_latest_price.dp = Math.round(this.company_latest_price.dp * 100) / 100;
        var cur_time = Math.round(Date.now().valueOf() / 1000);
        var getTimestamp : number;
        if (cur_time - this.company_latest_price.t > 5 * 60) {
          getTimestamp = this.company_latest_price.t;
        }
        else {
          getTimestamp = cur_time;
        }
        if (this.chartOptions.series){
          this.chartOptions.series[0].color = this.getLineColor();
          this.line_color_changed = true;
          this.changeUpdateFlag();
          this.getCompanyHistoricalData(q, getTimestamp);
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

  getCompanyHistoricalData(q : string, end: number) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var begin = end - (6 * 60 * 60);
      var url = 'https://finnhub.io/api/v1/stock/candle?symbol=' + q + '&resolution=5' + '&from=' + begin + '&to=' + end + '&token=' + this.api_key;
      console.log(url);
      this.http.get<CompanyHistoricalData>(url).subscribe((data : CompanyHistoricalData) => {
        this.company_historical_data = data;
        this.price_chart_data = [];
        for (let i = 0; i < this.company_historical_data.t.length; i++) {
          var tmp = [];
          tmp.push(this.company_historical_data.t[i] * 1000);
          tmp.push(this.company_historical_data.c[i]);
          this.price_chart_data.push(tmp);
        }
        if (this.chartOptions.series){
          // this.chartOptions.series[0].color = this.getLineColor();
          // this.line_color_changed = true;
          // this.changeUpdateFlag();
          if (this.chartOptions.series[0].type === 'line') {
            this.chartOptions.series[0].data = this.price_chart_data;
          }
          this.chart_data_changed = true;
          this.changeUpdateFlag();
        }
      });
      console.log("getCompanyHistoricalData response");
    }
  }

  transformNumber(d : number) {
    if (d < 10) {
      return '0' + d
    }
    else {
      return d.toString();
    }
  }

  getCompanyNews(q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var cur_time = Math.round(Date.now().valueOf());
      var seven_days_before = cur_time - (7 * 24 * 60 * 60 * 1000);
      var cur_date = new Date(cur_time);
      var before_date = new Date(seven_days_before);
      var month = this.transformNumber(cur_date.getMonth() + 1);
      var cur_date_string = cur_date.getFullYear() + '-' + month + '-' + this.transformNumber(cur_date.getDate());
      month = this.transformNumber(before_date.getMonth() + 1);
      var before_date_string = before_date.getFullYear() + '-' + month + '-' + this.transformNumber(cur_date.getDate());

      var url = 'https://finnhub.io/api/v1/company-news?symbol=' + q + '&from=' + before_date_string + '&to=' + cur_date_string + '&token=' + this.api_key;
      console.log(url);
      this.http.get<CompanyNews []>(url).subscribe((data : CompanyNews []) => {
        this.list_company_news = [];
        for (let i = 0; i < 20; i++) {
          if (i < data.length) {
            this.list_company_news.push(data[i]);
          }
          else {
            break;
          }
        }
      });
      console.log("getCompanyNews response");
    }
  }
}
