import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario debería ser inválido cuando está vacío', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('formulario debería ser válido con datos correctos', () => {
    component.form.setValue({ email: 'test@test.cl', password: 'Admin@1234' });
    expect(component.form.valid).toBeTruthy();
  });

  it('email inválido debería marcar error', () => {
    component.form.get('email')?.setValue('no-es-email');
    expect(component.form.get('email')?.valid).toBeFalsy();
  });

  it('password vacío debería marcar error', () => {
    component.form.get('password')?.setValue('');
    expect(component.form.get('password')?.valid).toBeFalsy();
  });

  it('togglePassword debería cambiar mostrarPassword', () => {
    expect(component.mostrarPassword).toBeFalse();
    component.togglePassword();
    expect(component.mostrarPassword).toBeTrue();
  });

  it('onSubmit con formulario inválido no debería navegar', () => {
    component.form.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(component.error).toBe('');
  });

  it('onSubmit con credenciales incorrectas debería mostrar error', () => {
    component.form.setValue({ email: 'malo@test.cl', password: 'Password1!' });
    component.onSubmit();
    expect(component.error).toBe('Correo o contraseña incorrectos.');
  });
});