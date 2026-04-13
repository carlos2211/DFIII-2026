package com.libreria.pedidos.strategy;

import com.libreria.pedidos.model.Pedido;

/**
 * Patrón Strategy — Define cómo se procesa cada estado de un pedido.
 * Permite cambiar dinámicamente la lógica de transición de estados.
 */
public interface EstadoPedidoStrategy {
    /**
     * Ejecuta la lógica correspondiente al estado actual del pedido.
     * @param pedido el pedido a procesar
     */
    void procesarEstado(Pedido pedido);

    /** Retorna el nombre del estado que maneja esta estrategia. */
    String getNombreEstado();
}
