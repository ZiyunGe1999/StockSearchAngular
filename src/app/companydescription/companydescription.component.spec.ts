import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanydescriptionComponent } from './companydescription.component';

describe('CompanydescriptionComponent', () => {
  let component: CompanydescriptionComponent;
  let fixture: ComponentFixture<CompanydescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanydescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanydescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
