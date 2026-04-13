package com.libreria.pedidos.strategy;

import com.libreria.pedidos.model.Pedido;

/**
 * Estrategia para pedidos CONFIRMADOS.
 * Valida que el pedido tenga dirección de envío antes de confirmar.
 */
public class EstadoConfirmadoStrategy implements EstadoPedidoStrategy {

    @Override
    public void procesarEstado(Pedido pedido) {
        if (pedido.getDireccionEnvio() == null || pedido.getDireccionEnvio().isBlank()) {
            throw new IllegalStateException("No se puede confirmar un pedido sin dirección de envío.");
        }
        pedido.setEstado("CONFIRMADO");
    }

    @Override
    public String getNombreEstado() { return "CONFIRMADO"; }
}
