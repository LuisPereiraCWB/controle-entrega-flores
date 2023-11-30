import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntregasComponent } from './lista-entregas.component';

describe('ListaEntregasComponent', () => {
  let component: ListaEntregasComponent;
  let fixture: ComponentFixture<ListaEntregasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEntregasComponent]
    });
    fixture = TestBed.createComponent(ListaEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
