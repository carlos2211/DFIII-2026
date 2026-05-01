import { TestBed } from '@angular/core/testing';
import { CarritoService } from '../../services/carrito.service';
import { Libro } from '../../models/libro.model';

describe('CarritoService', () => {
  let service: CarritoService;
  const mockLibro: Libro = {
    id: 1, titulo: 'Test', autor: 'Autor', anioPublicacion: 2020,
    genero: 'Novela', precio: 9990, imagen: '', descripcion: 'desc', stock: 5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('agregar() debería aumentar cantidad total', () => {
    service.agregar(mockLibro);
    expect(service.getCantidadTotal()).toBe(1);
  });

  it('agregar() el mismo libro dos veces debería incrementar cantidad', () => {
    service.agregar(mockLibro);
    service.agregar(mockLibro);
    expect(service.getCantidadTotal()).toBe(2);
  });

  it('quitar() debería eliminar el libro del carrito', () => {
    service.agregar(mockLibro);
    service.quitar(mockLibro.id);
    expect(service.getCantidadTotal()).toBe(0);
  });

  it('getTotal() debería calcular el total correctamente', () => {
    service.agregar(mockLibro);
    expect(service.getTotal()).toBe(9990);
  });

  it('vaciar() debería limpiar el carrito', () => {
    service.agregar(mockLibro);
    service.vaciar();
    expect(service.getCantidadTotal()).toBe(0);
  });

  it('cambiarCantidad() debería actualizar la cantidad', () => {
    service.agregar(mockLibro);
    service.cambiarCantidad(mockLibro.id, 3);
    expect(service.getCantidadTotal()).toBe(3);
  });

  it('getTotal() con carrito vacío debería retornar 0', () => {
    expect(service.getTotal()).toBe(0);
  });

  it('items$ debería emitir items actualizados al agregar', (done) => {
    service.items$.subscribe(items => {
      if (items.length > 0) {
        expect(items[0].libro.id).toBe(1);
        done();
      }
    });
    service.agregar(mockLibro);
  });

  it('cambiarCantidad() con cantidad menor a 1 debería quedar en 1', () => {
    service.agregar(mockLibro);
    service.cambiarCantidad(mockLibro.id, 0);
    expect(service.getCantidadTotal()).toBe(1);
  });

  it('quitar() libro inexistente no debería afectar el carrito', () => {
    service.agregar(mockLibro);
    service.quitar(9999);
    expect(service.getCantidadTotal()).toBe(1);
  });

  it('getTotal() con 2 libros distintos debería sumar correctamente', () => {
    const libro2 = { ...mockLibro, id: 2, precio: 5000 };
    service.agregar(mockLibro);
    service.agregar(libro2);
    expect(service.getTotal()).toBe(14990);
  });
});