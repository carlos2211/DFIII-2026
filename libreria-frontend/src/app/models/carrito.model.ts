import { Libro } from './libro.model';

export interface ItemCarrito {
  libro: Libro;
  cantidad: number;
}
