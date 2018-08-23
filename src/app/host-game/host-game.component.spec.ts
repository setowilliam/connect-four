import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostGameComponent } from './host-game.component';

describe('HostGameComponent', () => {
  let component: HostGameComponent;
  let fixture: ComponentFixture<HostGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
