package libreria.libreria.controller;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import libreria.libreria.model.Libro;
import libreria.libreria.service.LibroService;

@RestController
@RequestMapping("/libros")
@CrossOrigin(origins = "*")
public class LibroController {

    @Autowired
    private LibroService service;

    @GetMapping
    public List<Libro> obtenerTodos()                                      { return service.obtenerTodos(); }

    @GetMapping("/{id}")
    public Optional<Libro> obtenerLibro(@PathVariable Long id)             { return service.obtenerLibro(id); }

    @PostMapping
    public Libro crearLibro(@RequestBody Libro libro)                      { return service.crearLibro(libro); }

    @PutMapping("/{id}")
    public Libro actualizarLibro(@PathVariable Long id, @RequestBody Libro libro) {
        return service.actualizarLibro(id, libro);
    }

    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id)                       { service.eliminarLibro(id); }

    // ── Nuevo endpoint — Patrón Strategy ─────────────────────────────
    @GetMapping("/{id}/precio")
    public ResponseEntity<?> obtenerPrecioConDescuento(
            @PathVariable Long id,
            @RequestParam double precioOriginal) {

        Optional<Libro> libroOpt = service.obtenerLibro(id);
        if (libroOpt.isEmpty()) return ResponseEntity.notFound().build();

        Libro libro = libroOpt.get();
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("idLibro",          libro.getId());
        respuesta.put("titulo",           libro.getTitulo());
        respuesta.put("genero",           libro.getGenero());
        respuesta.put("precioOriginal",   precioOriginal);
        respuesta.put("precioFinal",      service.calcularPrecioConDescuento(libro, precioOriginal));
        respuesta.put("descuentoAplicado",service.obtenerNombreDescuento(libro));
        return ResponseEntity.ok(respuesta);
    }
}