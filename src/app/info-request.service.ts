import { Injectable } from '@angular/core';
import { AutoCompleteInfo, CompanyDescription, CompanyLatestPrice } from './format';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoRequestService {

  autocomplete_infos = {} as AutoCompleteInfo;
  symbol_list : string[] = [];
  api_key = 'c87v1q2ad3iet0qj41mg';

  conpmay_description = {} as CompanyDescription;
  company_latest_price = {}  as CompanyLatestPrice;

  constructor(
    private http: HttpClient
  ) { }

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
      this.http.get<CompanyDescription>(url).subscribe((data : CompanyDescription) => this.conpmay_description = {
        country :	data.country,
        currency :	data.currency,
        exchange :	data.exchange,
        finnhubIndustry	: data.finnhubIndustry,
        ipo :	data.ipo,
        logo :	data.logo,
        marketCapitalization :	data.marketCapitalization,
        name :	data.name,
        phone :	data.phone,
        shareOutstanding :	data.shareOutstanding,
        ticker :	data.ticker,
        weburl :	data.weburl
      });
      console.log("getCompnayDescription response");
    }
  }

  getCompanyLatestPrice(q : string) {
    if (typeof(q) != "undefined") {
      q = q.toUpperCase();
      var url = 'https://finnhub.io/api/v1/quote?symbol=' + q + '&token=' + this.api_key;
      console.log(url);
      this.http.get<CompanyLatestPrice>(url).subscribe((data : CompanyLatestPrice) => this.company_latest_price = {
        c : data.c,
        d : data.d,
        dp : data.dp,
        h : data.h,
        l : data.l,
        o : data.o,
        pc : data.pc,
        t : data.t
      });
      console.log("getCompanyLatestPrice response");
    }
  }
}
