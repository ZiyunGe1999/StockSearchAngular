import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylatestpriceComponent } from './companylatestprice.component';

describe('CompanylatestpriceComponent', () => {
  let component: CompanylatestpriceComponent;
  let fixture: ComponentFixture<CompanylatestpriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanylatestpriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanylatestpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
