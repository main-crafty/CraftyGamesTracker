import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModificationComponent } from './game-modification.component';

describe('GameModificationComponent', () => {
  let component: GameModificationComponent;
  let fixture: ComponentFixture<GameModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameModificationComponent]
    });
    fixture = TestBed.createComponent(GameModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
