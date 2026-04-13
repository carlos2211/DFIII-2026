import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemCarrito } from '../models/carrito.model';
import { Libro } from '../models/libro.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private items: ItemCarrito[] = [];
  private _items$ = new BehaviorSubject<ItemCarrito[]>([]);

  items$ = this._items$.asObservable();

  agregar(libro: Libro): void {
    const existente = this.items.find(i => i.libro.id === libro.id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({ libro, cantidad: 1 });
    }
    this._items$.next([...this.items]);
  }

  quitar(libroId: number): void {
    this.items = this.items.filter(i => i.libro.id !== libroId);
    this._items$.next([...this.items]);
  }

  cambiarCantidad(libroId: number, cantidad: number): void {
    const item = this.items.find(i => i.libro.id === libroId);
    if (item) {
      item.cantidad = Math.max(1, cantidad);
      this._items$.next([...this.items]);
    }
  }

  vaciar(): void {
    this.items = [];
    this._items$.next([]);
  }

  getTotal(): number {
    return this.items.reduce((acc, i) => acc + i.libro.precio * i.cantidad, 0);
  }

  getCantidadTotal(): number {
    return this.items.reduce((acc, i) => acc + i.cantidad, 0);
  }
}
