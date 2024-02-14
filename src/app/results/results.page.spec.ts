import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ResultsPage } from './results.page';

describe('ResultsPage', () => {
  let component: ResultsPage;
  let fixture: ComponentFixture<ResultsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
