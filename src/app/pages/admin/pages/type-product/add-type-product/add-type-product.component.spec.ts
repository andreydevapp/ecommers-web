import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeProductComponent } from './add-type-product.component';

describe('AddTypeProductComponent', () => {
  let component: AddTypeProductComponent;
  let fixture: ComponentFixture<AddTypeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
