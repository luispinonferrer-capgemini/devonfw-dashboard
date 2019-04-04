import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDevonComponent } from './doc-devon.component';

describe('DocDevonComponent', () => {
  let component: DocDevonComponent;
  let fixture: ComponentFixture<DocDevonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDevonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDevonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
