import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSizesComponent } from './add-sizes.component';

describe('AddSizesComponent', () => {
  let component: AddSizesComponent;
  let fixture: ComponentFixture<AddSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
