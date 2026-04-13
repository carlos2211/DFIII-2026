package com.libreria.pedidos.strategy;

import com.libreria.pedidos.model.Pedido;

/**
 * Estrategia para pedidos en estado PENDIENTE.
 * Calcula el total y marca el estado inicial.
 */
public class EstadoPendienteStrategy implements EstadoPedidoStrategy {

    @Override
    public void procesarEstado(Pedido pedido) {
        pedido.setEstado("PENDIENTE");
        // Calcular total automáticamente
        if (pedido.getPrecioUnitario() != null && pedido.getCantidad() != null) {
            pedido.setTotal(pedido.getPrecioUnitario() * pedido.getCantidad());
        }
    }

    @Override
    public String getNombreEstado() { return "PENDIENTE"; }
}
