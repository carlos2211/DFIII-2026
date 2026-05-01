import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionLibrosComponent } from './gestion-libros.component';
import { ClpPipe } from '../../../pipes/clp.pipe';

describe('GestionLibrosComponent', () => {
  let component: GestionLibrosComponent;
  let fixture: ComponentFixture<GestionLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionLibrosComponent, ClpPipe],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(GestionLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('mostrarFormulario debería ser false al inicio', () => {
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('abrirNuevo() debería mostrar formulario', () => {
    component.abrirNuevo();
    expect(component.mostrarFormulario).toBeTrue();
    expect(component.modoEdicion).toBeFalse();
  });

  it('cancelar() debería ocultar formulario', () => {
    component.abrirNuevo();
    component.cancelar();
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('formulario vacío debería ser inválido', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('editar() debería cargar datos en formulario', () => {
    const libro = { id: 1, titulo: 'Test', autor: 'Autor',
      anioPublicacion: 2020, genero: 'Novela', precio: 9990,
      imagen: '', descripcion: 'desc', stock: 5 };
    component.editar(libro);
    expect(component.modoEdicion).toBeTrue();
    expect(component.form.get('titulo')?.value).toBe('Test');
  });

  it('librosFiltrados debería retornar todos si no hay búsqueda', () => {
    component.busqueda = '';
    expect(component.librosFiltrados.length).toBe(component.libros.length);
  });

  it('guardar() con formulario inválido no debería proceder', () => {
    component.form.reset();
    component.guardar();
    expect(component.mensaje).toBe('');
  });
  it('mostrarMensaje() debería setear mensaje y tipo', () => {
    component.mostrarMensaje('Test mensaje', 'success');
    expect(component.mensaje).toBe('Test mensaje');
    expect(component.tipoMensaje).toBe('success');
  });

  it('librosFiltrados con búsqueda debería filtrar', () => {
    component.libros = [
      { id: 1, titulo: 'Cien años', autor: 'Garcia', anioPublicacion: 1967,
        genero: 'Novela', precio: 12990, imagen: '', descripcion: '', stock: 5 }
    ];
    component.busqueda = 'Cien';
    expect(component.librosFiltrados.length).toBe(1);
  });
});