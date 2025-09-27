package com.soundup.soundup.controller;

import com.soundup.soundup.model.Usuario;
import com.soundup.soundup.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService UsuarioService;

    public UsuarioController(UsuarioService UsuarioService) {
        this.UsuarioService = UsuarioService;
    }

    // GET all
    @GetMapping
    public List<Usuario> getUsuarios() {
        return UsuarioService.getAllUsuarios();
    }

    // GET by ID
    @GetMapping("/{id}")
    public Usuario getUsuario(@PathVariable int id) {
        return UsuarioService.getUsuarioById(id);
    }

    // POST create
    @PostMapping
    public void addUsuario(@RequestBody Usuario usuario) {
        UsuarioService.createUsuario(usuario);
    }

    // PUT update
    @PutMapping("/{id}")
    public void updateUsuario(@PathVariable int id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        UsuarioService.updateUsuario(usuario);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable int id) {
        UsuarioService.deleteUsuario(id);
    }
}
