import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpacesComponent } from './workpaces.component';

describe('WorkpacesComponent', () => {
  let component: WorkpacesComponent;
  let fixture: ComponentFixture<WorkpacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
