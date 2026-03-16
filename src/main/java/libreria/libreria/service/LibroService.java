package libreria.libreria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import libreria.libreria.model.Libro;
import libreria.libreria.repository.LibroRepository;

@Service
public class LibroService {

    @Autowired
    private LibroRepository repository;

    public List<Libro> obtenerTodos(){
        return repository.findAll();
    }

    public Optional<Libro> obtenerLibro(Long id){
        return repository.findById(id);
    }

    public Libro crearLibro(Libro libro){
        return repository.save(libro);
    }

    public Libro actualizarLibro(Long id, Libro libro){
        libro.setId(id);
        return repository.save(libro);
    }

    public void eliminarLibro(Long id){
        repository.deleteById(id);
    }
}