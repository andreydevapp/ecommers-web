import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeProductComponent } from './edit-type-product.component';

describe('EditTypeProductComponent', () => {
  let component: EditTypeProductComponent;
  let fixture: ComponentFixture<EditTypeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
