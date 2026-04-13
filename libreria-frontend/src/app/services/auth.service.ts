import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // ── Datos estáticos (listas) ──────────────────────────────────────────
  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Carlos Admin',   email: 'admin@libreria.cl',  password: 'Admin@1234',  rol: 'ADMIN',   telefono: '+56911111111', direccion: 'Av. Providencia 123' },
    { id: 2, nombre: 'María González', email: 'maria@correo.cl',    password: 'Maria@1234',  rol: 'CLIENTE', telefono: '+56922222222', direccion: 'Calle Las Flores 456' },
    { id: 3, nombre: 'Pedro Soto',     email: 'pedro@correo.cl',    password: 'Pedro@5678',  rol: 'CLIENTE', telefono: '+56933333333', direccion: 'Pasaje El Monte 789' },
  ];

  private usuarioActual: Usuario | null = null;

  // ── Login ─────────────────────────────────────────────────────────────
  login(email: string, password: string): Usuario | null {
    const usuario = this.usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      this.usuarioActual = usuario;
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    }
    return usuario ?? null;
  }

  // ── Logout ────────────────────────────────────────────────────────────
  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
  }

  // ── Registro ──────────────────────────────────────────────────────────
  registrar(nombre: string, email: string, password: string): boolean {
    if (this.usuarios.find(u => u.email === email)) return false;
    const nuevo: Usuario = {
      id: this.usuarios.length + 1,
      nombre, email, password,
      rol: 'CLIENTE'
    };
    this.usuarios.push(nuevo);
    return true;
  }

  // ── Recuperar contraseña (simulado) ───────────────────────────────────
  recuperarPassword(email: string): boolean {
    return !!this.usuarios.find(u => u.email === email);
  }

  // ── Actualizar perfil ─────────────────────────────────────────────────
  actualizarPerfil(datos: Partial<Usuario>): boolean {
    const idx = this.usuarios.findIndex(u => u.id === this.usuarioActual?.id);
    if (idx === -1) return false;
    this.usuarios[idx] = { ...this.usuarios[idx], ...datos };
    this.usuarioActual = this.usuarios[idx];
    localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
    return true;
  }

  // ── Getters ───────────────────────────────────────────────────────────
  getUsuarioActual(): Usuario | null {
    if (!this.usuarioActual) {
      const stored = localStorage.getItem('usuarioActual');
      if (stored) this.usuarioActual = JSON.parse(stored);
    }
    return this.usuarioActual;
  }

  isLoggedIn(): boolean { return !!this.getUsuarioActual(); }
  isAdmin(): boolean    { return this.getUsuarioActual()?.rol === 'ADMIN'; }
  isCliente(): boolean  { return this.getUsuarioActual()?.rol === 'CLIENTE'; }

  getTodosUsuarios(): Usuario[] { return this.usuarios; }
}
