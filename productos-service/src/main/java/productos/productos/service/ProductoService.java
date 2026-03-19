package productos.productos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import productos.productos.model.Producto;
import productos.productos.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repository;

    public List<Producto> obtenerTodos(){
        return repository.findAll();
    }

    public Optional<Producto> obtenerProducto(Long id){
        return repository.findById(id);
    }

    public Producto crearProducto(Producto producto){
        return repository.save(producto);
    }

    public Producto actualizarProducto(Long id, Producto producto){
        producto.setId(id);
        return repository.save(producto);
    }

    public void eliminarProducto(Long id){
        repository.deleteById(id);
    }
}