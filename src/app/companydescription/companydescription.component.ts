import { Component, OnInit } from '@angular/core';
import { InfoRequestService } from '../info-request.service';

@Component({
  selector: 'app-companydescription',
  templateUrl: './companydescription.component.html',
  styleUrls: ['./companydescription.component.css']
})
export class CompanydescriptionComponent implements OnInit {

  constructor(
    public info_service : InfoRequestService
  ) { }

  ngOnInit(): void {
  }

}
