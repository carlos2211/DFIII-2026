package com.libreria.pedidos.strategy;

import com.libreria.pedidos.model.Pedido;

// ── ENVIADO ────────────────────────────────────────────────────────────
class EstadoEnviadoStrategy implements EstadoPedidoStrategy {
    @Override
    public void procesarEstado(Pedido pedido) {
        pedido.setEstado("ENVIADO");
    }
    @Override
    public String getNombreEstado() { return "ENVIADO"; }
}

// ── ENTREGADO ──────────────────────────────────────────────────────────
class EstadoEntregadoStrategy implements EstadoPedidoStrategy {
    @Override
    public void procesarEstado(Pedido pedido) {
        pedido.setEstado("ENTREGADO");
    }
    @Override
    public String getNombreEstado() { return "ENTREGADO"; }
}

// ── CANCELADO ──────────────────────────────────────────────────────────
class EstadoCanceladoStrategy implements EstadoPedidoStrategy {
    @Override
    public void procesarEstado(Pedido pedido) {
        if ("ENTREGADO".equals(pedido.getEstado())) {
            throw new IllegalStateException("No se puede cancelar un pedido ya entregado.");
        }
        pedido.setEstado("CANCELADO");
    }
    @Override
    public String getNombreEstado() { return "CANCELADO"; }
}

// ── FACTORY ────────────────────────────────────────────────────────────
/**
 * Fábrica que selecciona la estrategia correcta según el estado solicitado.
 */
public class EstadoPedidoStrategyFactory {

    public static EstadoPedidoStrategy obtenerEstrategia(String estado) {
        if (estado == null) return new EstadoPendienteStrategy();
        return switch (estado.toUpperCase()) {
            case "PENDIENTE"  -> new EstadoPendienteStrategy();
            case "CONFIRMADO" -> new EstadoConfirmadoStrategy();
            case "ENVIADO"    -> new EstadoEnviadoStrategy();
            case "ENTREGADO"  -> new EstadoEntregadoStrategy();
            case "CANCELADO"  -> new EstadoCanceladoStrategy();
            default -> throw new IllegalArgumentException("Estado desconocido: " + estado);
        };
    }
}
