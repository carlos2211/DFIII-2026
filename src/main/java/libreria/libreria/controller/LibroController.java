package libreria.libreria.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import libreria.libreria.model.Libro;
import libreria.libreria.service.LibroService;

@RestController
@RequestMapping("/libros")
public class LibroController {

    @Autowired
    private LibroService service;

    @GetMapping("/{id}")
    public Optional<Libro> obtenerLibro(@PathVariable Long id){
        return service.obtenerLibro(id);
    }

    @GetMapping
    public List<Libro> obtenerTodos(){
        return service.obtenerTodos();
    }

    @PostMapping
    public Libro crearLibro(@RequestBody Libro libro){
        return service.crearLibro(libro);
    }

    @PutMapping("/{id}")
    public Libro actualizarLibro(@PathVariable Long id, @RequestBody Libro libro){
        return service.actualizarLibro(id, libro);
    }

    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id){
        service.eliminarLibro(id);
    }
}