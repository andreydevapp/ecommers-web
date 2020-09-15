import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserStorageComponent } from './register-user-storage.component';

describe('RegisterUserStorageComponent', () => {
  let component: RegisterUserStorageComponent;
  let fixture: ComponentFixture<RegisterUserStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
