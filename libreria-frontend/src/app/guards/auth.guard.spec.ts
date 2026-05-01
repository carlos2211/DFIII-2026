import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard, AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('debería crearse correctamente', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate() debería retornar false si no está logueado', () => {
    authService.logout();
    expect(guard.canActivate()).toBeFalse();
  });

  it('canActivate() debería retornar true si está logueado', () => {
    authService.login('admin@libreria.cl', 'Admin@1234');
    expect(guard.canActivate()).toBeTrue();
  });
});