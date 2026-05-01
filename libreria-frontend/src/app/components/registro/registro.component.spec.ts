import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario vacío debería ser inválido', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('contraseña sin mayúscula debería fallar validación', () => {
    component.form.get('password')?.setValue('password1!');
    expect(component.form.get('password')?.errors?.['sinMayuscula']).toBeTrue();
  });

  it('contraseña sin número debería fallar validación', () => {
    component.form.get('password')?.setValue('Password!');
    expect(component.form.get('password')?.errors?.['sinNumero']).toBeTrue();
  });

  it('contraseña sin especial debería fallar validación', () => {
    component.form.get('password')?.setValue('Password1');
    expect(component.form.get('password')?.errors?.['sinEspecial']).toBeTrue();
  });

  it('contraseña válida debería pasar todas las validaciones', () => {
    component.form.get('password')?.setValue('Password1!');
    expect(component.form.get('password')?.valid).toBeTrue();
  });

  it('onSubmit con formulario inválido no debería registrar', () => {
    component.onSubmit();
    expect(component.exito).toBeFalse();
  });

  it('contraseña menor a 8 caracteres debería fallar', () => {
    component.form.get('password')?.setValue('Pa1!');
    expect(component.form.get('password')?.errors?.['minlength']).toBeTrue();
  });

  it('mostrarPass debería cambiar al llamar toggle', () => {
    expect(component.mostrarPass).toBeFalse();
    component.mostrarPass = true;
    expect(component.mostrarPass).toBeTrue();
  });

  it('nombre con menos de 3 caracteres debería ser inválido', () => {
    component.form.get('nombre')?.setValue('AB');
    expect(component.form.get('nombre')?.valid).toBeFalsy();
  });

  it('email con formato incorrecto debería ser inválido', () => {
    component.form.get('email')?.setValue('correo-sin-arroba');
    expect(component.form.get('email')?.valid).toBeFalsy();
  });
});