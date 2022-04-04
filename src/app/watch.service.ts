import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor() {
   }

   addWatch(ticker: string, company: string) {
     localStorage.setItem(ticker, company);
   }

   removeWatch(ticker : string) {
     localStorage.removeItem(ticker);
   }

   getWatchlistItem (ticker : string) {
     return localStorage.getItem(ticker);
   }

   getWatchList() {
     return Object.keys(localStorage);
   }

   isInWatchlist(s : string) {
     s = s.toUpperCase();
    var watchlist  = this.getWatchList();
    for (let item of watchlist) {
      item = item.toUpperCase();
      if (s === item) {
        return true;
      }
    }
    return false;
   }


}
