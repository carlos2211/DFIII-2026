import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { Libro }        from '../../../models/libro.model';

@Component({
  selector: 'app-gestion-libros',
  standalone: false,
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {
  libros: Libro[]   = [];
  form: FormGroup;
  modoEdicion       = false;
  idEditando: number | null = null;
  mostrarFormulario = false;
  busqueda          = '';
  mensaje           = '';
  tipoMensaje       = '';
  cargando          = false;

  generos = ['Novela', 'Texto Escolar', 'Infantil', 'Historia', 'Realismo mágico', 'Política y Ciencias Sociales', 'Ciencia', 'Arte'];

  constructor(private libroSvc: LibroService, private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo:          ['', [Validators.required, Validators.minLength(2)]],
      autor:           ['', Validators.required],
      anioPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(2026)]],
      genero:          ['', Validators.required],
      precio:          ['', [Validators.required, Validators.min(1)]],
      stock:           ['', [Validators.required, Validators.min(0)]],
      descripcion:     ['', Validators.required],
      imagen:          [''],
    });
  }

  ngOnInit(): void { this.cargarLibros(); }

  cargarLibros(): void {
    this.cargando = true;
    this.libroSvc.getLibrosHttp().subscribe({
      next: (libros) => {
        this.libros   = libros;
        this.cargando = false;
      },
      error: () => {
        this.libros   = this.libroSvc.getLibros();
        this.cargando = false;
      }
    });
  }

  get librosFiltrados(): Libro[] {
    if (!this.busqueda.trim()) return this.libros;
    const t = this.busqueda.toLowerCase();
    return this.libros.filter(l =>
      l.titulo.toLowerCase().includes(t) ||
      l.autor.toLowerCase().includes(t) ||
      l.genero.toLowerCase().includes(t)
    );
  }

  get f() { return this.form.controls; }

  abrirNuevo(): void {
    this.form.reset();
    this.modoEdicion = false;
    this.idEditando  = null;
    this.mostrarFormulario = true;
  }

  editar(libro: Libro): void {
    this.form.patchValue(libro);
    this.modoEdicion = true;
    this.idEditando  = libro.id;
    this.mostrarFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.form.reset();
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const datos = this.form.value;

    if (this.modoEdicion && this.idEditando !== null) {
      // Actualizar vía API
      this.libroSvc.actualizarLibroHttp(this.idEditando, datos).subscribe({
        next: () => {
          this.mostrarMensaje('✅ Libro actualizado correctamente.', 'success');
          this.mostrarFormulario = false;
          this.form.reset();
          this.cargarLibros();
        },
        error: () => {
          // Fallback local
          this.libroSvc.actualizarLibro(this.idEditando!, datos);
          this.mostrarMensaje('✅ Libro actualizado (local).', 'success');
          this.mostrarFormulario = false;
          this.form.reset();
          this.cargarLibros();
        }
      });
    } else {
      // Crear vía API
      this.libroSvc.crearLibroHttp(datos).subscribe({
        next: () => {
          this.mostrarMensaje('✅ Libro agregado correctamente.', 'success');
          this.mostrarFormulario = false;
          this.form.reset();
          this.cargarLibros();
        },
        error: () => {
          // Fallback local
          this.libroSvc.agregarLibro(datos);
          this.mostrarMensaje('✅ Libro agregado (local).', 'success');
          this.mostrarFormulario = false;
          this.form.reset();
          this.cargarLibros();
        }
      });
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este libro?')) return;
    // Eliminar vía API
    this.libroSvc.eliminarLibroHttp(id).subscribe({
      next: () => {
        this.mostrarMensaje('🗑️ Libro eliminado.', 'warning');
        this.cargarLibros();
      },
      error: () => {
        // Fallback local
        this.libroSvc.eliminarLibro(id);
        this.mostrarMensaje('🗑️ Libro eliminado (local).', 'warning');
        this.cargarLibros();
      }
    });
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje    = msg;
    this.tipoMensaje= tipo;
    setTimeout(() => this.mensaje = '', 3500);
  }
}