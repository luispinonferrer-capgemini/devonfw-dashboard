import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildprocessesComponent } from './childprocesses.component';

describe('ChildprocessesComponent', () => {
  let component: ChildprocessesComponent;
  let fixture: ComponentFixture<ChildprocessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildprocessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildprocessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
