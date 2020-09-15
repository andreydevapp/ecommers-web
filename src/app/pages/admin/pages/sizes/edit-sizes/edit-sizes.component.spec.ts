import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSizesComponent } from './edit-sizes.component';

describe('EditSizesComponent', () => {
  let component: EditSizesComponent;
  let fixture: ComponentFixture<EditSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSizesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
