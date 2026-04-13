package com.libreria.pedidos.service;

import com.libreria.pedidos.model.Pedido;
import com.libreria.pedidos.repository.PedidoRepository;
import com.libreria.pedidos.strategy.EstadoPedidoStrategy;
import com.libreria.pedidos.strategy.EstadoPedidoStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository repository;

    // ── Crear pedido ──────────────────────────────────────────────────
    public Pedido crearPedido(Pedido pedido) {
        pedido.setFechaPedido(LocalDateTime.now());

        // Patrón Strategy: inicializa en estado PENDIENTE y calcula total
        EstadoPedidoStrategy strategy = EstadoPedidoStrategyFactory.obtenerEstrategia("PENDIENTE");
        strategy.procesarEstado(pedido);

        return repository.save(pedido);
    }

    // ── Obtener todos ─────────────────────────────────────────────────
    public List<Pedido> obtenerTodos() {
        return repository.findAll();
    }

    // ── Obtener por ID ────────────────────────────────────────────────
    public Optional<Pedido> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    // ── Obtener por usuario ───────────────────────────────────────────
    public List<Pedido> obtenerPorUsuario(Long idUsuario) {
        return repository.findByIdUsuario(idUsuario);
    }

    // ── Obtener por estado ────────────────────────────────────────────
    public List<Pedido> obtenerPorEstado(String estado) {
        return repository.findByEstado(estado.toUpperCase());
    }

    // ── Cambiar estado con Strategy ───────────────────────────────────
    /**
     * Aplica el patrón Strategy para cambiar el estado del pedido.
     * Valida la transición según la estrategia correspondiente.
     */
    public Pedido cambiarEstado(Long id, String nuevoEstado) {
        Pedido pedido = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado: " + id));

        EstadoPedidoStrategy strategy = EstadoPedidoStrategyFactory.obtenerEstrategia(nuevoEstado);
        strategy.procesarEstado(pedido);

        return repository.save(pedido);
    }

    // ── Actualizar pedido ─────────────────────────────────────────────
    public Pedido actualizarPedido(Long id, Pedido datos) {
        Pedido existente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado: " + id));

        if (datos.getDireccionEnvio() != null) existente.setDireccionEnvio(datos.getDireccionEnvio());
        if (datos.getCantidad()       != null) {
            existente.setCantidad(datos.getCantidad());
            existente.setTotal(existente.getPrecioUnitario() * datos.getCantidad());
        }

        return repository.save(existente);
    }

    // ── Eliminar pedido ───────────────────────────────────────────────
    public void eliminarPedido(Long id) {
        repository.deleteById(id);
    }
}
