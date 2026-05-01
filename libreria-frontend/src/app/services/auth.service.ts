import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8081/usuarios';

  private usuarioActual: Usuario | null = null;

  // Usuarios locales como respaldo
  private usuarios: Usuario[] = [
    { id: 1, nombre: 'Carlos Admin', email: 'admin@libreria.cl', password: 'Admin@1234', rol: 'ADMIN' },
    { id: 2, nombre: 'María González', email: 'maria@correo.cl', password: 'Maria@1234', rol: 'CLIENTE' },
    { id: 3, nombre: 'Pedro Soto', email: 'pedro@correo.cl', password: 'Pedro@5678', rol: 'CLIENTE' },
  ];

  constructor(private http: HttpClient) {}

  // ── Login (primero intenta API, luego local) ──────────────────────────
  login(email: string, password: string): Usuario | null {
    const usuario = this.usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      this.usuarioActual = usuario;
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    }
    return usuario ?? null;
  }

  // ── Login vía API ─────────────────────────────────────────────────────
  loginHttp(correo: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`,
      { correo, password },
      { responseType: 'text' as 'json' }
    ).pipe(catchError(() => of('Credenciales incorrectas')));
  }

  // ── Registro vía API ──────────────────────────────────────────────────
  registrarHttp(usuario: Partial<Usuario>): Observable<any> {
    return this.http.post(`${this.apiUrl}`, usuario).pipe(
      catchError(() => of(null))
    );
  }

  // ── Obtener usuarios vía API ──────────────────────────────────────────
  getUsuariosHttp(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(() => of([]))
    );
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
  }

  registrar(nombre: string, email: string, password: string): boolean {
    if (this.usuarios.find(u => u.email === email)) return false;
    this.usuarios.push({ id: this.usuarios.length + 1, nombre, email, password, rol: 'CLIENTE' });
    return true;
  }

  recuperarPassword(email: string): boolean {
    return !!this.usuarios.find(u => u.email === email);
  }

  actualizarPerfil(datos: Partial<Usuario>): boolean {
    const idx = this.usuarios.findIndex(u => u.id === this.usuarioActual?.id);
    if (idx === -1) return false;
    this.usuarios[idx] = { ...this.usuarios[idx], ...datos };
    this.usuarioActual = this.usuarios[idx];
    localStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual));
    return true;
  }

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