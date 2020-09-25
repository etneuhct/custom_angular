import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XFormComponent } from './x-form.component';

describe('XFormComponent', () => {
  let component: XFormComponent;
  let fixture: ComponentFixture<XFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
