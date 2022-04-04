declare var require: any;
import { Injectable } from '@angular/core';
import { AutoCompleteInfo, CompanyDescription, CompanyLatestPrice, CompanyHistoricalData, CompanyNews } from './format';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from "highcharts/highstock";
require('highcharts/indicators/indicators')(Highcharts); // loads core and enables sma
require('highcharts/indicators/volume-by-price')(Highcharts); // loads enables vbp
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InfoRequestService {

  routeTicker = 'home';

  autocomplete_infos = {} as AutoCompleteInfo;
  symbol_list : string[] = [];

  conpmay_description = {} as CompanyDescription;
  company_latest_price = {}  as CompanyLatestPrice;
  company_historical_data = {}  as CompanyHistoricalData;
  list_company_news : CompanyNews[] = [];
  company_peers : string[] = [];
  ready = false;
  readyToShowInfo = false;

  // company_two_years_data = {} as CompanyHistoricalData;
  ohlc : number[][] = [
    [1521466200000, 177.32, 177.47, 173.66, 175.3],
    [1521552600000, 175.24, 176.8, 174.94, 175.24],
    [1521639000000, 175.04, 175.09, 171.26, 171.27],
    [1521725400000, 170, 172.68, 168.6, 168.85]
  ];
  volume : number[][] = [
    [1521466200000, 177.32],
    [1521552600000, 175.24],
    [1521639000000, 175.04],
    [1521725400000, 170]
  ];
  chartsTabUpdateFlag  = false;
  chartsTabHighCharts = Highcharts;
  chartsTabOptions : Highcharts.Options = {
    rangeSelector: {
      selected: 2
    },

    title: {
      text: 'Historical'
    },

    subtitle: {
      text: 'With SMA and Volume by Price technical indicators'
    },

    yAxis: [{
      startOnTick: false,
      endOnTick: false,
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],

    tooltip: {
      split: true
    },

    plotOptions: {
      // series: {
      //   dataGrouping: {
      //     units: [[
      //       'week',             // unit name
      //       [1]               // allowed multiples
      //     ], [
      //       'month',
      //       [1, 2, 3, 4, 6]
      //     ]]
      //   }
      // }
    },

    series: [{
      type: 'candlestick',
      name: 'None',
      id: 'ticker',
      zIndex: 2,
      data: this.ohlc
    }, {
      type: 'column',
      name: 'Volume',
      id: 'volume',
      data: this.volume,
      yAxis: 1
    }, 
    {
      type: 'vbp',
      linkedTo: 'ticker',
      params: {
        volumeSeriesID: 'volume'
      },
      dataLabels: {
        enabled: false
      },
      zoneLines: {
        enabled: false
      }
    }, 
    {
      type: 'sma',
      linkedTo: 'ticker',
      zIndex: 1,
      marker: {
        enabled: false
      }
    }
  ]
  }

  constructor(
    private http: HttpClient,
    private location : Location
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

  onSubmit(symbol : string): void {
    // window.alert('symbol: ' + this.searchForm.value['symbol']);
    this.readyToShowInfo = false;
    this.ready = false;
    this.getCompnayDescription(symbol);
    this.getCompanyLatestPrice(symbol);
    this.getCompanyPeers(symbol);
    this.ready = true;
    this.getCompanyNews(symbol);
    this.getTwoYearsData(symbol);
    this.location.go(`/search/${symbol}`);
  }

  getAutoCompleteInfo(q : string) {
    if (typeof(q) != "undefined" && q.length > 1) {
      q = q.toUpperCase();
      var url = '/api/v1/search?q=' + q;
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
      var url = '/api/v1/stock/profile2?symbol=' + q;
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
        if (JSON.stringify(data) != '{}') {
          this.readyToShowInfo = true;
        }
      });
      console.log("getCompnayDescription response");
    }
  }

  getCompanyLatestPrice(q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var url = '/api/v1/quote?symbol=' + q;
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
      var url = '/api/v1/stock/peers?symbol=' + q;
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

  getTwoYearsData (q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var end = Math.round(Date.now().valueOf() / 1000);
      var begin = end - (2 * 365 * 24 * 60 * 60);
      var url = '/api/v1/stock/candle?symbol=' + q + '&resolution=D' + '&from=' + begin + '&to=' + end;
      console.log(url);
      this.http.get<CompanyHistoricalData>(url).subscribe((data : CompanyHistoricalData) => {
        // this.company_two_years_data = data;
        console.log("inside get");
        this.ohlc = [];
        this.volume = [];
        for (let i = 0; i < data.t.length; i++) {
          this.ohlc.push([
          data.t[i] * 1000,
          data.o[i],
          data.h[i],
          data.l[i],
          data.c[i]
          ]);
          this.volume.push([
            data.t[i] * 1000,
            data.v[i]
          ]);
        }
        if (this.chartsTabOptions.series){
          this.chartsTabOptions.series[0].name = q;
          if (this.chartsTabOptions.title) {
            this.chartsTabOptions.title.text = q + ' Historical';
          }
          if (this.chartsTabOptions.series[0].type === 'candlestick') {
            this.chartsTabOptions.series[0].data = this.ohlc;
          }
          if (this.chartsTabOptions.series[1].type === 'column') {
            this.chartsTabOptions.series[1].data = this.volume;
          }
          this.chartsTabUpdateFlag = true;
          console.log('going outside');
        }
      });
      console.log("getTwoYearsData response");
    }
  }

  getCompanyHistoricalData(q : string, end: number) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var begin = end - (6 * 60 * 60);
      var url = '/api/v1/stock/candle?symbol=' + q + '&resolution=5' + '&from=' + begin + '&to=' + end;
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

      var url = '/api/v1/company-news?symbol=' + q + '&from=' + before_date_string + '&to=' + cur_date_string;
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
