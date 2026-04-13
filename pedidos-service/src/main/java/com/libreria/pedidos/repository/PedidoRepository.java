package com.libreria.pedidos.repository;

import com.libreria.pedidos.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    /** Obtiene todos los pedidos de un usuario específico. */
    List<Pedido> findByIdUsuario(Long idUsuario);

    /** Obtiene pedidos por estado (ej: PENDIENTE, CONFIRMADO). */
    List<Pedido> findByEstado(String estado);

    /** Obtiene pedidos de un usuario filtrados por estado. */
    List<Pedido> findByIdUsuarioAndEstado(Long idUsuario, String estado);
}
