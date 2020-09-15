import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOcasionComponent } from './add-ocasion.component';

describe('AddOcasionComponent', () => {
  let component: AddOcasionComponent;
  let fixture: ComponentFixture<AddOcasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOcasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOcasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
