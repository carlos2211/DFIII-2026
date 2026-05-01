import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('login() con credenciales correctas debería retornar usuario', () => {
    const usuario = service.login('admin@libreria.cl', 'Admin@1234');
    expect(usuario).toBeTruthy();
    expect(usuario?.rol).toBe('ADMIN');
  });

  it('login() con credenciales incorrectas debería retornar null', () => {
    const usuario = service.login('malo@correo.cl', 'wrong');
    expect(usuario).toBeNull();
  });

  it('isLoggedIn() debería ser true tras login exitoso', () => {
    service.login('maria@correo.cl', 'Maria@1234');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('logout() debería limpiar el usuario actual', () => {
    service.login('maria@correo.cl', 'Maria@1234');
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('isAdmin() debería ser true para usuario admin', () => {
    service.login('admin@libreria.cl', 'Admin@1234');
    expect(service.isAdmin()).toBeTrue();
  });

  it('isCliente() debería ser true para usuario cliente', () => {
    service.login('maria@correo.cl', 'Maria@1234');
    expect(service.isCliente()).toBeTrue();
  });

  it('registrar() debería agregar nuevo usuario', () => {
    const ok = service.registrar('Nuevo', 'nuevo@test.cl', 'Pass@1234');
    expect(ok).toBeTrue();
  });

  it('registrar() debería fallar si el email ya existe', () => {
    const ok = service.registrar('Admin', 'admin@libreria.cl', 'Admin@1234');
    expect(ok).toBeFalse();
  });

  it('recuperarPassword() debería retornar true si el email existe', () => {
    expect(service.recuperarPassword('admin@libreria.cl')).toBeTrue();
  });

  it('recuperarPassword() debería retornar false si el email no existe', () => {
    expect(service.recuperarPassword('noexiste@test.cl')).toBeFalse();
  });

  it('actualizarPerfil() debería actualizar datos del usuario', () => {
    service.login('maria@correo.cl', 'Maria@1234');
    const ok = service.actualizarPerfil({ nombre: 'María Actualizada' });
    expect(ok).toBeTrue();
    expect(service.getUsuarioActual()?.nombre).toBe('María Actualizada');
  });

  it('getUsuarioActual() debería retornar null si no hay sesión', () => {
    service.logout();
    localStorage.removeItem('usuarioActual');
    expect(service.getUsuarioActual()).toBeNull();
  });

  it('getTodosUsuarios() debería retornar array con usuarios', () => {
    expect(service.getTodosUsuarios().length).toBeGreaterThan(0);
  });
});
