import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGraphComponent } from './list-graph.component';

describe('ListGraphComponent', () => {
  let component: ListGraphComponent;
  let fixture: ComponentFixture<ListGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
