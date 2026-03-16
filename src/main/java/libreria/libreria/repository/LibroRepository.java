package libreria.libreria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import libreria.libreria.model.Libro;

public interface LibroRepository extends JpaRepository<Libro, Long> {

}