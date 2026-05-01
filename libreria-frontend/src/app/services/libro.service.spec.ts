import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LibroService } from './libro.service';
import { Libro } from '../models/libro.model';

describe('LibroService', () => {
  let service: LibroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LibroService],
    });
    service = TestBed.inject(LibroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('getLibrosHttp() debería retornar lista de libros', () => {
    const mockLibros: Libro[] = [
      {
        id: 1,
        titulo: 'Test',
        autor: 'Autor',
        anioPublicacion: 2020,
        genero: 'Novela',
        precio: 9990,
        imagen: '',
        descripcion: 'desc',
        stock: 5,
      },
    ];
    service.getLibrosHttp().subscribe((libros) => {
      expect(libros.length).toBe(1);
      expect(libros[0].titulo).toBe('Test');
    });
    const req = httpMock.expectOne('http://localhost:8080/libros');
    expect(req.request.method).toBe('GET');
    req.flush(mockLibros);
  });

  it('crearLibroHttp() debería hacer POST', () => {
    const nuevo = {
      titulo: 'Nuevo',
      autor: 'Autor',
      anioPublicacion: 2020,
      genero: 'Novela',
      precio: 9990,
      imagen: '',
      descripcion: 'desc',
      stock: 5,
    };
    service.crearLibroHttp(nuevo).subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne('http://localhost:8080/libros');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 99, ...nuevo });
  });

  it('eliminarLibroHttp() debería hacer DELETE', () => {
    service.eliminarLibroHttp(1).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/libros/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('calcularPrecioConDescuento() debería aplicar 15% a Novela', () => {
    const libro: Libro = {
      id: 1,
      titulo: 'T',
      autor: 'A',
      anioPublicacion: 2020,
      genero: 'Novela',
      precio: 10000,
      imagen: '',
      descripcion: '',
      stock: 1,
    };
    expect(service.calcularPrecioConDescuento(libro)).toBe(8500);
  });

  it('calcularPrecioConDescuento() debería aplicar 20% a Texto Escolar', () => {
    const libro: Libro = {
      id: 1,
      titulo: 'T',
      autor: 'A',
      anioPublicacion: 2020,
      genero: 'Texto Escolar',
      precio: 10000,
      imagen: '',
      descripcion: '',
      stock: 1,
    };
    expect(service.calcularPrecioConDescuento(libro)).toBe(8000);
  });

  it('calcularPrecioConDescuento() debería aplicar 10% a Infantil', () => {
    const libro: Libro = {
      id: 1,
      titulo: 'T',
      autor: 'A',
      anioPublicacion: 2020,
      genero: 'Infantil',
      precio: 10000,
      imagen: '',
      descripcion: '',
      stock: 1,
    };
    expect(service.calcularPrecioConDescuento(libro)).toBe(9000);
  });

  it('getLibros() debería retornar lista local', () => {
    const libros = service.getLibros();
    expect(libros.length).toBeGreaterThan(0);
  });

  it('buscar() debería filtrar por título', () => {
    const resultado = service.buscar('soledad');
    expect(resultado.length).toBeGreaterThan(0);
  });

it('getLibroPorId() debería retornar libro existente', () => {
    const libros = service.getLibros();
    const id = libros[0].id;
    expect(service.getLibroPorId(id)).toBeTruthy();
  });

  it('getLibroPorId() debería retornar undefined si no existe', () => {
    expect(service.getLibroPorId(9999)).toBeUndefined();
  });

  it('getGeneros() debería retornar array sin duplicados', () => {
    const generos = service.getGeneros();
    const unicos = [...new Set(generos)];
    expect(generos.length).toBe(unicos.length);
  });

  it('agregarLibro() debería agregar libro a la lista local', () => {
    const antes = service.getLibros().length;
    service.agregarLibro({
      titulo: 'Nuevo', autor: 'Autor', anioPublicacion: 2020,
      genero: 'Novela', precio: 9990, imagen: '', descripcion: 'desc', stock: 5
    });
    expect(service.getLibros().length).toBe(antes + 1);
  });

  it('actualizarLibro() debería modificar libro existente', () => {
    const libros = service.getLibros();
    const id = libros[0].id;
    const ok = service.actualizarLibro(id, { titulo: 'Titulo Modificado' });
    expect(ok).toBeTrue();
    expect(service.getLibroPorId(id)?.titulo).toBe('Titulo Modificado');
  });

  it('actualizarLibro() debería retornar false si no existe', () => {
    expect(service.actualizarLibro(9999, { titulo: 'X' })).toBeFalse();
  });

  it('eliminarLibro() debería eliminar libro existente', () => {
    const antes = service.getLibros().length;
    const id = service.getLibros()[0].id;
    service.eliminarLibro(id);
    expect(service.getLibros().length).toBe(antes - 1);
  });

  it('eliminarLibro() debería retornar false si no existe', () => {
    expect(service.eliminarLibro(9999)).toBeFalse();
  });

  it('actualizarLibroHttp() debería hacer PUT', () => {
    service.actualizarLibroHttp(1, { titulo: 'Actualizado' }).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/libros/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ id: 1, titulo: 'Actualizado' });
  });

  it('getPrecioConDescuento() debería hacer GET con parámetro', () => {
    service.getPrecioConDescuento(1, 10000).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/libros/1/precio?precioOriginal=10000');
    expect(req.request.method).toBe('GET');
    req.flush({ precioFinal: 8500 });
  });

  it('calcularPrecioConDescuento() sin descuento para Historia', () => {
    const libro = { id: 1, titulo: 'T', autor: 'A', anioPublicacion: 2020,
      genero: 'Historia', precio: 10000, imagen: '', descripcion: '', stock: 1 };
    expect(service.calcularPrecioConDescuento(libro)).toBe(10000);
  });
  
});


