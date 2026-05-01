import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../../services/libro.service';
import { AuthService }  from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalLibros    = 0;
  totalUsuarios  = 0;
  totalGeneros   = 0;
  librosStockBajo: any[] = [];

  constructor(private libroSvc: LibroService, private authSvc: AuthService) {}

  ngOnInit(): void {
    // Cargar desde API
    this.libroSvc.getLibrosHttp().subscribe({
      next: (libros) => {
        this.totalLibros     = libros.length;
        this.totalGeneros    = [...new Set(libros.map(l => l.genero))].length;
        this.librosStockBajo = libros.filter(l => l.stock <= 5);
      },
      error: () => {
        // Fallback local
        const libros         = this.libroSvc.getLibros();
        this.totalLibros     = libros.length;
        this.totalGeneros    = this.libroSvc.getGeneros().length;
        this.librosStockBajo = libros.filter(l => l.stock <= 5);
      }
    });

    this.totalUsuarios = this.authSvc.getTodosUsuarios().length;
  }
}