import { Injectable } from '@angular/core';
import { AutoCompleteInfo } from './format';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoRequestService {

  autocomplete_infos = {} as AutoCompleteInfo;
  symbol_list : string[] = [];
  api_key = 'c87v1q2ad3iet0qj41mg';

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
        console.log(this.autocomplete_infos.result[i].symbol);
        this.symbol_list.push(this.autocomplete_infos.result[i].symbol);
      }
    }
    
    // return symbol_list;
    // for (let i = 0; i < infos['count'])
    // return this.autocomplete_infos;
  }
}
