import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexmenuComponent } from './indexmenu.component';

describe('IndexmenuComponent', () => {
  let component: IndexmenuComponent;
  let fixture: ComponentFixture<IndexmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
