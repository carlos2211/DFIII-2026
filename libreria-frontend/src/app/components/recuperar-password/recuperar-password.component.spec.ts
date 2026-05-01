import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecuperarPasswordComponent } from './recuperar-password.component';

describe('RecuperarPasswordComponent', () => {
  let component: RecuperarPasswordComponent;
  let fixture: ComponentFixture<RecuperarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarPasswordComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(RecuperarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario vacío debería ser inválido', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email inválido debería marcar error', () => {
    component.form.get('email')?.setValue('no-email');
    expect(component.form.get('email')?.valid).toBeFalsy();
  });

  it('email válido debería pasar validación', () => {
    component.form.get('email')?.setValue('test@test.cl');
    expect(component.form.get('email')?.valid).toBeTrue();
  });

  it('onSubmit con email existente debería marcar enviado', () => {
    component.form.get('email')?.setValue('admin@libreria.cl');
    component.onSubmit();
    expect(component.enviado).toBeTrue();
  });

  it('onSubmit con email inexistente debería mostrar error', () => {
    component.form.get('email')?.setValue('noexiste@test.cl');
    component.onSubmit();
    expect(component.error).toBeTruthy();
  });
});