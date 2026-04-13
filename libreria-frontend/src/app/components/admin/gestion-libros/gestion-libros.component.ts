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

  generos = ['Novela', 'Texto Escolar', 'Infantil', 'Historia', 'Ciencia', 'Arte', 'Tecnología'];

  constructor(private libroSvc: LibroService, private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo:          ['', [Validators.required, Validators.minLength(2)]],
      autor:           ['', Validators.required],
      anioPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(2025)]],
      genero:          ['', Validators.required],
      precio:          ['', [Validators.required, Validators.min(1)]],
      stock:           ['', [Validators.required, Validators.min(0)]],
      descripcion:     ['', Validators.required],
      imagen:          [''],
    });
  }

  ngOnInit(): void { this.cargarLibros(); }

  cargarLibros(): void { this.libros = this.libroSvc.getLibros(); }

  get librosFiltrados(): Libro[] {
    if (!this.busqueda.trim()) return this.libros;
    return this.libroSvc.buscar(this.busqueda);
  }

  get f() { return this.form.controls; }

  abrirNuevo(): void {
    this.form.reset();
    this.modoEdicion = false; this.idEditando = null; this.mostrarFormulario = true;
  }

  editar(libro: Libro): void {
    this.form.patchValue(libro);
    this.modoEdicion = true; this.idEditando = libro.id; this.mostrarFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelar(): void { this.mostrarFormulario = false; this.form.reset(); }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    if (this.modoEdicion && this.idEditando !== null) {
      this.libroSvc.actualizarLibro(this.idEditando, this.form.value);
      this.mostrarMensaje('✅ Libro actualizado correctamente.', 'success');
    } else {
      this.libroSvc.agregarLibro(this.form.value);
      this.mostrarMensaje('✅ Libro agregado correctamente.', 'success');
    }
    this.mostrarFormulario = false; this.form.reset(); this.cargarLibros();
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este libro?')) return;
    this.libroSvc.eliminarLibro(id);
    this.cargarLibros();
    this.mostrarMensaje('🗑️ Libro eliminado.', 'warning');
  }

  mostrarMensaje(msg: string, tipo: string): void {
    this.mensaje = msg; this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 3500);
  }
}
