import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerListingComponent } from './employer-listing.component';

describe('EmployerListingComponent', () => {
  let component: EmployerListingComponent;
  let fixture: ComponentFixture<EmployerListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
