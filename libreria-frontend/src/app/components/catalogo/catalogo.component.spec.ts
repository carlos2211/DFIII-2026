import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CatalogoComponent } from './catalogo.component';
import { ClpPipe } from '../../pipes/clp.pipe';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoComponent, ClpPipe],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(CatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('limpiarFiltros() debería resetear busqueda y genero', () => {
    component.busqueda    = 'test';
    component.generoSelec = 'Novela';
    component.limpiarFiltros();
    expect(component.busqueda).toBe('');
    expect(component.generoSelec).toBe('');
  });

  it('agregarAlCarrito() debería agregar libro al set de agregados', () => {
    const libro = { id: 1, titulo: 'T', autor: 'A', anioPublicacion: 2020,
      genero: 'Novela', precio: 9990, imagen: '', descripcion: '', stock: 5 };
    component.agregarAlCarrito(libro);
    expect(component.agregados.has(1)).toBeTrue();
  });

  it('tieneDescuento() debería retornar true para Novela', () => {
    const libro = { id: 1, titulo: 'T', autor: 'A', anioPublicacion: 2020,
      genero: 'Novela', precio: 10000, imagen: '', descripcion: '', stock: 5 };
    expect(component.tieneDescuento(libro)).toBeTrue();
  });

  it('tieneDescuento() debería retornar false para género sin descuento', () => {
    const libro = { id: 1, titulo: 'T', autor: 'A', anioPublicacion: 2020,
      genero: 'Historia', precio: 10000, imagen: '', descripcion: '', stock: 5 };
    expect(component.tieneDescuento(libro)).toBeFalse();
  });

  it('filtrar() debería filtrar por busqueda', () => {
    component.libros = [
      { id: 1, titulo: 'Cien años', autor: 'Garcia', anioPublicacion: 1967,
        genero: 'Novela', precio: 12990, imagen: '', descripcion: '', stock: 5 },
      { id: 2, titulo: 'El Principito', autor: 'Saint', anioPublicacion: 1943,
        genero: 'Infantil', precio: 8990, imagen: '', descripcion: '', stock: 10 }
    ];
    component.busqueda = 'Cien';
    component.filtrar();
    expect(component.filtrados.length).toBe(1);
  });

  it('filtrar() debería filtrar por género', () => {
    component.libros = [
      { id: 1, titulo: 'Cien años', autor: 'Garcia', anioPublicacion: 1967,
        genero: 'Novela', precio: 12990, imagen: '', descripcion: '', stock: 5 },
      { id: 2, titulo: 'El Principito', autor: 'Saint', anioPublicacion: 1943,
        genero: 'Infantil', precio: 8990, imagen: '', descripcion: '', stock: 10 }
    ];
    component.generoSelec = 'Novela';
    component.filtrar();
    expect(component.filtrados.length).toBe(1);
  });
  it('getPrecioConDescuento() debería retornar precio con descuento', () => {
    const libro = { id: 1, titulo: 'T', autor: 'A', anioPublicacion: 2020,
      genero: 'Novela', precio: 10000, imagen: '', descripcion: '', stock: 5 };
    expect(component.getPrecioConDescuento(libro)).toBe(8500);
  });

  it('filtrar() con búsqueda y género debería filtrar correctamente', () => {
    component.libros = [
      { id: 1, titulo: 'Cien años', autor: 'Garcia', anioPublicacion: 1967,
        genero: 'Novela', precio: 12990, imagen: '', descripcion: '', stock: 5 },
      { id: 2, titulo: 'El Principito', autor: 'Saint', anioPublicacion: 1943,
        genero: 'Infantil', precio: 8990, imagen: '', descripcion: '', stock: 10 }
    ];
    component.busqueda = 'Cien';
    component.generoSelec = 'Novela';
    component.filtrar();
    expect(component.filtrados.length).toBe(1);
    expect(component.filtrados[0].genero).toBe('Novela');
  });
});