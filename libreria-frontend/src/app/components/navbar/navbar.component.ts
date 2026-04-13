import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario | null = null;
  cantidadCarrito = 0;

  constructor(
    private auth: AuthService,
    private carrito: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.auth.getUsuarioActual();
    this.carrito.items$.subscribe(items => {
      this.cantidadCarrito = items.reduce((acc, i) => acc + i.cantidad, 0);
    });
  }

  get isLoggedIn() { return this.auth.isLoggedIn(); }
  get isAdmin()    { return this.auth.isAdmin(); }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
