import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerDataComponent } from './employer-data.component';

describe('EmployerDataComponent', () => {
  let component: EmployerDataComponent;
  let fixture: ComponentFixture<EmployerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
