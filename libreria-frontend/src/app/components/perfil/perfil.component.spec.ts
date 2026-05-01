import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerfilComponent } from './perfil.component';
import { AuthService } from '../../services/auth.service';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario debería ser inválido cuando está vacío', () => {
    component.form.reset();
    expect(component.form.valid).toBeFalsy();
  });

  it('email inválido debería marcar error', () => {
    component.form.patchValue({ email: 'no-email' });
    expect(component.form.get('email')?.valid).toBeFalsy();
  });

  it('nombre muy corto debería marcar error', () => {
    component.form.patchValue({ nombre: 'A' });
    expect(component.form.get('nombre')?.valid).toBeFalsy();
  });

  it('onSubmit con formulario inválido no debería actualizar', () => {
    component.form.reset();
    component.onSubmit();
    expect(component.exito).toBeFalse();
  });

  it('onSubmit con datos válidos debería actualizar perfil', () => {
    authService = TestBed.inject(AuthService);
    authService.login('maria@correo.cl', 'Maria@1234');
    component.ngOnInit();
    component.form.patchValue({
      nombre: 'María Test',
      email: 'maria@correo.cl',
      telefono: '',
      direccion: ''
    });
    component.onSubmit();
    expect(component.exito).toBeTrue();
  });
});