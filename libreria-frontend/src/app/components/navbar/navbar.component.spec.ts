import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('isLoggedIn debería ser false si no hay usuario', () => {
    authService.logout();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('isLoggedIn debería ser true tras login', () => {
    authService.login('admin@libreria.cl', 'Admin@1234');
    expect(component.isLoggedIn).toBeTrue();
  });

  it('isAdmin debería ser true para admin', () => {
    authService.login('admin@libreria.cl', 'Admin@1234');
    expect(component.isAdmin).toBeTrue();
  });

  it('isAdmin debería ser false para cliente', () => {
    authService.login('maria@correo.cl', 'Maria@1234');
    expect(component.isAdmin).toBeFalse();
  });

  it('logout() debería cerrar sesión', () => {
    authService.login('admin@libreria.cl', 'Admin@1234');
    component.logout();
    expect(component.isLoggedIn).toBeFalse();
  });
});