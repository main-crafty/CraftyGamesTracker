import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserXgameAssociationComponent } from './user-xgame-association.component';

describe('UserXgameAssociationComponent', () => {
  let component: UserXgameAssociationComponent;
  let fixture: ComponentFixture<UserXgameAssociationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserXgameAssociationComponent]
    });
    fixture = TestBed.createComponent(UserXgameAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
