import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarInstitucionComponent } from './agregar-editar-institucion.component';

describe('AgregarEditarInstitucionComponent', () => {
  let component: AgregarEditarInstitucionComponent;
  let fixture: ComponentFixture<AgregarEditarInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarInstitucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
