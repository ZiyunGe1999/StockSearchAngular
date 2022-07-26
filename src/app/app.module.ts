import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoshowComponent } from './infoshow/infoshow.component';
import { CompanydescriptionComponent } from './companydescription/companydescription.component';
import { CompanylatestpriceComponent } from './companylatestprice/companylatestprice.component';
import { SummaryComponent } from './summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { TopnewsComponent } from './topnews/topnews.component';
import { ChartsTabComponent } from './charts-tab/charts-tab.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { InsightsComponent } from './insights/insights.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    InfoshowComponent,
    CompanydescriptionComponent,
    CompanylatestpriceComponent,
    SummaryComponent,
    TopnewsComponent,
    ChartsTabComponent,
    WatchlistComponent,
    InsightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HighchartsChartModule
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
