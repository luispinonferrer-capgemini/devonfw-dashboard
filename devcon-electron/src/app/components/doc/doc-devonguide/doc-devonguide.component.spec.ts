import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDevonguideComponent } from './doc-devonguide.component';

describe('DocDevonguideComponent', () => {
  let component: DocDevonguideComponent;
  let fixture: ComponentFixture<DocDevonguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDevonguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDevonguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
