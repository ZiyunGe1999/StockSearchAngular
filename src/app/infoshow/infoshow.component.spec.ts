import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoshowComponent } from './infoshow.component';

describe('InfoshowComponent', () => {
  let component: InfoshowComponent;
  let fixture: ComponentFixture<InfoshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoshowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
