import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Libro } from '../models/libro.model';

@Injectable({ providedIn: 'root' })
export class LibroService {

  private apiUrl = 'http://localhost:8080/libros';

  // Datos locales como respaldo
  private librosLocales: Libro[] = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anioPublicacion: 1967, genero: 'Novela', precio: 12990, imagen: 'https://covers.openlibrary.org/b/id/8231856-L.jpg', descripcion: 'Obra maestra del realismo mágico.', stock: 15 },
    { id: 2, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', anioPublicacion: 1943, genero: 'Infantil', precio: 8990, imagen: 'https://covers.openlibrary.org/b/id/8571427-L.jpg', descripcion: 'Un clásico universal.', stock: 20 },
    { id: 3, titulo: 'Matemáticas 3° Medio', autor: 'Editorial Santillana', anioPublicacion: 2022, genero: 'Texto Escolar', precio: 15990, imagen: 'https://covers.openlibrary.org/b/id/10527843-L.jpg', descripcion: 'Texto oficial.', stock: 30 },
   
  ];

  constructor(private http: HttpClient) {}

  // ── Métodos HTTP (conectados al BackEnd) ──────────────────────────────

  getLibrosHttp(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl).pipe(
      catchError(() => of(this.librosLocales))
    );
  }

  crearLibroHttp(libro: Partial<Libro>): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  actualizarLibroHttp(id: number, libro: Partial<Libro>): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  eliminarLibroHttp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPrecioConDescuento(id: number, precio: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/precio?precioOriginal=${precio}`);
  }

  // ── Métodos locales (para filtros y búsqueda en FrontEnd) ─────────────

  getLibros(): Libro[] { return [...this.librosLocales]; }
  getLibroPorId(id: number): Libro | undefined { return this.librosLocales.find(l => l.id === id); }
  getGeneros(): string[] { return [...new Set(this.librosLocales.map(l => l.genero))]; }

  buscar(termino: string): Libro[] {
    const t = termino.toLowerCase();
    return this.librosLocales.filter(l =>
      l.titulo.toLowerCase().includes(t) ||
      l.autor.toLowerCase().includes(t) ||
      l.genero.toLowerCase().includes(t)
    );
  }

  agregarLibro(libro: Omit<Libro, 'id'>): Libro {
    const nuevo = { ...libro, id: Date.now() };
    this.librosLocales.push(nuevo);
    return nuevo;
  }

  actualizarLibro(id: number, datos: Partial<Libro>): boolean {
    const idx = this.librosLocales.findIndex(l => l.id === id);
    if (idx === -1) return false;
    this.librosLocales[idx] = { ...this.librosLocales[idx], ...datos };
    return true;
  }

  eliminarLibro(id: number): boolean {
    const idx = this.librosLocales.findIndex(l => l.id === id);
    if (idx === -1) return false;
    this.librosLocales.splice(idx, 1);
    return true;
  }

  calcularPrecioConDescuento(libro: Libro): number {
    const descuentos: Record<string, number> = {
      'Novela': 0.15,
      'Texto Escolar': 0.20,
      'Infantil': 0.10,
    };
    return libro.precio * (1 - (descuentos[libro.genero] ?? 0));
  }
}