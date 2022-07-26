import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
// import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import {InfoRequestService} from '../info-request.service';
import { AlertService } from '../alert.service';
import {Location} from '@angular/common';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public infoService : InfoRequestService,
    public alertService : AlertService,
    private location : Location
    ) { }

    ngOnInit() {
      // console.log(`current location: ${this.location.path()}`);
      // console.log(`current url: ${this.route.url}`);
      // var routeParams = this.route.snapshot.paramMap;
      var cur_path = this.location.path().toString();
      console.log(cur_path);
      this.infoService.routeTicker = cur_path.split('/')[2];
      console.log(`route ticker: ${this.infoService.routeTicker}`);
      if (this.infoService.routeTicker != 'home') {
        this.infoService.onSubmit(this.infoService.routeTicker);
      }
    }

  public model: any;
  init_color = "#2323AC";
  search_color = this.init_color;
  times_color = this.init_color;
  input_size = 0;

  searchForm = this.formBuilder.group({
    symbol: ''
  });

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.infoService.symbol_list.filter(v => v.toUpperCase().indexOf(term.toUpperCase()) > -1).slice(0, 10))
    )

  updateAutoComplete() {
    // console.log('updateAutoComplete');
    this.input_size = this.searchForm.value['symbol'].length;
    var pre_input_size = this.input_size;
    setTimeout(()=>{                           // <<<---using ()=> syntax
      if (pre_input_size == this.input_size) {
        this.infoService.getAutoCompleteInfo(this.searchForm.value['symbol']);
      }
    }, 500);
    // this.infoService.getAutoCompleteInfo(this.searchForm.value['symbol']);
  }

  cleanForm() {
    this.searchForm.reset();
  }

  changeColor(which_one : string, color : string) {
    if (which_one == 'times') {
      this.times_color = color;
    }
    else {
      this.search_color = color;
    }
  }

  // onSubmit(): void {
  //   // window.alert('symbol: ' + this.searchForm.value['symbol']);
  //   this.infoService.readyToShowInfo = false;
  //   this.infoService.ready = false;
  //   this.infoService.getCompnayDescription(this.searchForm.value['symbol']);
  //   this.infoService.getCompanyLatestPrice(this.searchForm.value['symbol']);
  //   this.infoService.getCompanyPeers(this.searchForm.value['symbol']);
  //   this.infoService.ready = true;
  //   this.infoService.getCompanyNews(this.searchForm.value['symbol']);
  //   this.infoService.getTwoYearsData(this.searchForm.value['symbol']);
  // }

}
