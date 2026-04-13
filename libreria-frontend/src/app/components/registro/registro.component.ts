import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function passwordSegura(control: AbstractControl): ValidationErrors | null {
  const v = control.value || '';
  const errores: ValidationErrors = {};
  if (v.length < 8)   errores['minlength']    = true;
  if (v.length > 20)  errores['maxlength']    = true;
  if (!/[A-Z]/.test(v)) errores['sinMayuscula'] = true;
  if (!/[0-9]/.test(v)) errores['sinNumero']    = true;
  if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(v)) errores['sinEspecial'] = true;
  return Object.keys(errores).length ? errores : null;
}

function confirmarPassword(group: AbstractControl): ValidationErrors | null {
  const pass    = group.get('password')?.value;
  const confirm = group.get('confirmarPassword')?.value;
  return pass === confirm ? null : { noCoincide: true };
}

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form: FormGroup;
  exito = false;
  error = '';
  mostrarPass    = false;
  mostrarConfirm = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nombre:            ['', [Validators.required, Validators.minLength(3)]],
      email:             ['', [Validators.required, Validators.email]],
      telefono:          ['', [Validators.pattern(/^\+?[0-9]{9,12}$/)]],
      password:          ['', [Validators.required, passwordSegura]],
      confirmarPassword: ['', Validators.required],
    }, { validators: confirmarPassword });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { nombre, email, password } = this.form.value;
    const ok = this.auth.registrar(nombre, email, password);
    if (ok) { this.exito = true; setTimeout(() => this.router.navigate(['/login']), 2500); }
    else    { this.error = 'El correo ya está registrado.'; }
  }
}
