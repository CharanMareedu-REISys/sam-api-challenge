import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamFiltersComponent } from './sam-filters.component';

describe('SamFiltersComponent', () => {
  let component: SamFiltersComponent;
  let fixture: ComponentFixture<SamFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
