import { Component, OnInit } from '@angular/core';
import { LibroService }   from '../../services/libro.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService }    from '../../services/auth.service';
import { Libro }          from '../../models/libro.model';

@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  libros:    Libro[] = [];
  filtrados: Libro[] = [];
  generos:   string[] = [];
  busqueda    = '';
  generoSelec = '';
  agregados   = new Set<number>();
  cargando    = true;

  constructor(
    private libroSvc:   LibroService,
    private carritoSvc: CarritoService,
    public  authSvc:    AuthService
  ) {}

  ngOnInit(): void {
    this.libroSvc.getLibrosHttp().subscribe({
      next: (libros) => {
        this.libros    = libros;
        this.filtrados = [...libros];
        this.generos   = [...new Set(libros.map((l: Libro) => l.genero))];
        this.cargando  = false;
      },
      error: () => {
        this.libros    = this.libroSvc.getLibros();
        this.filtrados = [...this.libros];
        this.generos   = this.libroSvc.getGeneros();
        this.cargando  = false;
      }
    });
  }

  filtrar(): void {
    let resultado = [...this.libros];
    if (this.busqueda.trim()) {
      const t = this.busqueda.toLowerCase();
      resultado = resultado.filter(l =>
        l.titulo.toLowerCase().includes(t) ||
        l.autor.toLowerCase().includes(t) ||
        l.genero.toLowerCase().includes(t)
      );
    }
    if (this.generoSelec) {
      resultado = resultado.filter(l => l.genero === this.generoSelec);
    }
    this.filtrados = resultado;
  }

  limpiarFiltros(): void {
    this.busqueda    = '';
    this.generoSelec = '';
    this.filtrados   = [...this.libros];
  }

  agregarAlCarrito(libro: Libro): void {
    this.carritoSvc.agregar(libro);
    this.agregados.add(libro.id);
    setTimeout(() => this.agregados.delete(libro.id), 2000);
  }

  getPrecioConDescuento(libro: Libro): number  { return this.libroSvc.calcularPrecioConDescuento(libro); }
  tieneDescuento(libro: Libro): boolean        { return this.getPrecioConDescuento(libro) < libro.precio; }
}