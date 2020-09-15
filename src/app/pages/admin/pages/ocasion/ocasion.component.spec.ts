import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcasionComponent } from './ocasion.component';

describe('OcasionComponent', () => {
  let component: OcasionComponent;
  let fixture: ComponentFixture<OcasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
