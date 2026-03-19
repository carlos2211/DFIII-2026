package productos.productos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import productos.productos.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}