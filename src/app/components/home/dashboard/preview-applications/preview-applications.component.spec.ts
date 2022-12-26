import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewApplicationsComponent } from './preview-applications.component';

describe('PreviewApplicationsComponent', () => {
  let component: PreviewApplicationsComponent;
  let fixture: ComponentFixture<PreviewApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
