import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaDemoComponent } from './rca-demo.component';

describe('RcaDemoComponent', () => {
  let component: RcaDemoComponent;
  let fixture: ComponentFixture<RcaDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RcaDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
