import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOcasionComponent } from './edit-ocasion.component';

describe('EditOcasionComponent', () => {
  let component: EditOcasionComponent;
  let fixture: ComponentFixture<EditOcasionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOcasionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOcasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
