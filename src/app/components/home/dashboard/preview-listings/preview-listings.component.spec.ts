import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewListingsComponent } from './preview-listings.component';

describe('PreviewListingsComponent', () => {
  let component: PreviewListingsComponent;
  let fixture: ComponentFixture<PreviewListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
