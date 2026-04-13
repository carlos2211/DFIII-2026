import { Injectable } from '@angular/core';
import { Libro } from '../models/libro.model';

@Injectable({ providedIn: 'root' })
export class LibroService {

  // ── Catálogo estático de libros (mínimo 5 productos) ─────────────────
  private libros: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anioPublicacion: 1967, genero: 'Novela',        precio: 12990, imagen: 'https://covers.openlibrary.org/b/id/8231856-L.jpg',  descripcion: 'Obra maestra del realismo mágico latinoamericano.', stock: 15 },
    { id: 2, titulo: 'El Principito',         autor: 'Antoine de Saint-Exupéry', anioPublicacion: 1943, genero: 'Infantil',   precio: 8990,  imagen: 'https://covers.openlibrary.org/b/id/8571427-L.jpg',  descripcion: 'Un clásico universal para todas las edades.', stock: 20 },
    { id: 3, titulo: 'Matemáticas 3° Medio', autor: 'Editorial Santillana',    anioPublicacion: 2022, genero: 'Texto Escolar',precio: 15990, imagen: 'https://covers.openlibrary.org/b/id/10527843-L.jpg', descripcion: 'Texto oficial con ejercicios y actividades.', stock: 30 },
    { id: 4, titulo: '1984',                  autor: 'George Orwell',           anioPublicacion: 1949, genero: 'Novela',        precio: 11490, imagen: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',  descripcion: 'Distopía clásica sobre el totalitarismo.', stock: 12 },
    { id: 5, titulo: 'Historia de Chile',     autor: 'Benjamín Vicuña Mackenna',anioPublicacion: 2020, genero: 'Historia',     precio: 18990, imagen: 'https://covers.openlibrary.org/b/id/8091016-L.jpg',  descripcion: 'Completo recorrido por la historia nacional.', stock: 8  },
    { id: 6, titulo: 'Lengua y Literatura 1°',autor: 'Editorial SM',            anioPublicacion: 2023, genero: 'Texto Escolar',precio: 14490, imagen: 'https://covers.openlibrary.org/b/id/10874780-L.jpg', descripcion: 'Texto escolar con enfoque comunicativo.', stock: 25 },
    { id: 7, titulo: 'Harry Potter I',        autor: 'J.K. Rowling',            anioPublicacion: 1997, genero: 'Infantil',     precio: 9990,  imagen: 'https://covers.openlibrary.org/b/id/10110415-L.jpg', descripcion: 'El inicio de la saga mágica más famosa del mundo.', stock: 18 },
    { id: 8, titulo: 'Don Quijote',           autor: 'Miguel de Cervantes',     anioPublicacion: 1605, genero: 'Novela',        precio: 13990, imagen: 'https://covers.openlibrary.org/b/id/8098545-L.jpg',  descripcion: 'La primera novela moderna de la literatura occidental.', stock: 10 },
  ];

  private nextId = 9;

  getLibros(): Libro[]                      { return [...this.libros]; }
  getLibroPorId(id: number): Libro | undefined { return this.libros.find(l => l.id === id); }

  getLibrosPorGenero(genero: string): Libro[] {
    return this.libros.filter(l => l.genero.toLowerCase() === genero.toLowerCase());
  }

  buscar(termino: string): Libro[] {
    const t = termino.toLowerCase();
    return this.libros.filter(l =>
      l.titulo.toLowerCase().includes(t) ||
      l.autor.toLowerCase().includes(t) ||
      l.genero.toLowerCase().includes(t)
    );
  }

  agregarLibro(libro: Omit<Libro, 'id'>): Libro {
    const nuevo = { ...libro, id: this.nextId++ };
    this.libros.push(nuevo);
    return nuevo;
  }

  actualizarLibro(id: number, datos: Partial<Libro>): boolean {
    const idx = this.libros.findIndex(l => l.id === id);
    if (idx === -1) return false;
    this.libros[idx] = { ...this.libros[idx], ...datos };
    return true;
  }

  eliminarLibro(id: number): boolean {
    const idx = this.libros.findIndex(l => l.id === id);
    if (idx === -1) return false;
    this.libros.splice(idx, 1);
    return true;
  }

  getGeneros(): string[] {
    return [...new Set(this.libros.map(l => l.genero))];
  }

  // Patrón Strategy: calcula precio con descuento según género
  calcularPrecioConDescuento(libro: Libro): number {
    const descuentos: Record<string, number> = {
      'Novela':        0.15,
      'Texto Escolar': 0.20,
      'Infantil':      0.10,
    };
    const descuento = descuentos[libro.genero] ?? 0;
    return libro.precio * (1 - descuento);
  }
}
