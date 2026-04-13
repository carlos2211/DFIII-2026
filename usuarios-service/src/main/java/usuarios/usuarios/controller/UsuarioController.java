package usuarios.usuarios.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import usuarios.usuarios.model.Usuario;
import usuarios.usuarios.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> obtenerTodos() {
        return service.obtenerTodos();
    }

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return service.crearUsuario(usuario);
    }

    // login
    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {

        Optional<Usuario> user = service.login(usuario.getCorreo(), usuario.getPassword());

        if (user.isPresent()) {
            return "Login exitoso - Rol: " + user.get().getRol();
        }

        return "Credenciales incorrectas";
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public Optional<Usuario> obtenerUsuario(@PathVariable Long id) {
        return service.obtenerUsuario(id);
    }

    // Editar 
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.actualizarUsuario(id, usuario);
    }

    // Eliminar 
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        service.eliminarUsuario(id);
    }
}