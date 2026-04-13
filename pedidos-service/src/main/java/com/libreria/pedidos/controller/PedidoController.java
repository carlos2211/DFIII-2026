package com.libreria.pedidos.controller;

import com.libreria.pedidos.model.Pedido;
import com.libreria.pedidos.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService service;

    // ── GET todos ─────────────────────────────────────────────────────
    @GetMapping
    public List<Pedido> obtenerTodos() {
        return service.obtenerTodos();
    }

    // ── GET por ID ────────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ── GET por usuario ───────────────────────────────────────────────
    @GetMapping("/usuario/{idUsuario}")
    public List<Pedido> obtenerPorUsuario(@PathVariable Long idUsuario) {
        return service.obtenerPorUsuario(idUsuario);
    }

    // ── GET por estado ────────────────────────────────────────────────
    @GetMapping("/estado/{estado}")
    public List<Pedido> obtenerPorEstado(@PathVariable String estado) {
        return service.obtenerPorEstado(estado);
    }

    // ── POST crear pedido ─────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        Pedido creado = service.crearPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // ── PUT actualizar datos ──────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizarPedido(
            @PathVariable Long id,
            @RequestBody Pedido datos) {
        try {
            return ResponseEntity.ok(service.actualizarPedido(id, datos));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ── PATCH cambiar estado (Patrón Strategy) ────────────────────────
    @PatchMapping("/{id}/estado/{nuevoEstado}")
    public ResponseEntity<?> cambiarEstado(
            @PathVariable Long id,
            @PathVariable String nuevoEstado) {
        try {
            Pedido actualizado = service.cambiarEstado(id, nuevoEstado);
            return ResponseEntity.ok(actualizado);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ── DELETE ────────────────────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPedido(@PathVariable Long id) {
        service.eliminarPedido(id);
        return ResponseEntity.noContent().build();
    }
}
