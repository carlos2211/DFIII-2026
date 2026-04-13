import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { ItemCarrito }    from '../../models/carrito.model';
import { Router }         from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: ItemCarrito[] = [];
  pedidoConfirmado = false;
  numeroPedido     = '';

  constructor(private carrito: CarritoService, private router: Router) {}

  ngOnInit(): void { this.carrito.items$.subscribe(i => this.items = i); }

  getTotal(): number       { return this.carrito.getTotal(); }
  quitar(id: number): void { this.carrito.quitar(id); }

  cambiarCantidad(id: number, e: Event): void {
    const val = +(e.target as HTMLInputElement).value;
    this.carrito.cambiarCantidad(id, val);
  }

  confirmarPedido(): void {
    this.numeroPedido    = 'PED-' + Math.floor(Math.random() * 90000 + 10000);
    this.pedidoConfirmado= true;
    this.carrito.vaciar();
  }

  seguirComprando(): void { this.router.navigate(['/catalogo']); }
}
