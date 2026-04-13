import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form: FormGroup;
  usuario: Usuario | null = null;
  exito = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      nombre:    ['', [Validators.required, Validators.minLength(3)]],
      email:     ['', [Validators.required, Validators.email]],
      telefono:  ['', [Validators.pattern(/^\+?[0-9]{9,12}$/)]],
      direccion: [''],
    });
  }

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();
    if (this.usuario) {
      this.form.patchValue({
        nombre:    this.usuario.nombre,
        email:     this.usuario.email,
        telefono:  this.usuario.telefono  || '',
        direccion: this.usuario.direccion || '',
      });
    }
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const ok = this.auth.actualizarPerfil(this.form.value);
    if (ok) {
      this.exito   = true;
      this.usuario = this.auth.getUsuarioActual();
      setTimeout(() => this.exito = false, 3000);
    } else {
      this.error = 'Error al actualizar el perfil.';
    }
  }
}
