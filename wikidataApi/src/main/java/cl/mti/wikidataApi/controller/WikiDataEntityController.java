package cl.mti.wikidataApi.controller;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.service.WikiDataEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/WikiDataEntities")
public class WikiDataEntityController {

    @Autowired
    private WikiDataEntityService service;

    @PostMapping("")
    @ResponseStatus(value = HttpStatus.OK)
    public void loadFromWikidata(){
        service.loadFromWikidata();
    }

    @GetMapping("")
    public ResponseEntity<List<LocalEnt>> listar(){
        List<LocalEnt> entidades = service.listar();
        return ResponseEntity.ok(entidades);
    }

    @GetMapping("/{EntityId}")
    public ResponseEntity<LocalEnt> buscar(@PathVariable(value = "EntityId") String entityId){
        LocalEnt localEnt = service.buscar(entityId);
        return ResponseEntity.ok(localEnt);
    }

    @PutMapping("/{EntityId}")
    public ResponseEntity<LocalEnt> actualizar(@PathVariable(value = "EntityId") String entityId, @RequestBody LocalEnt entity){
        LocalEnt localEnt = service.actualizar(entityId, entity);
        return ResponseEntity.ok(localEnt);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping("{EntityId}")
    public void eliminar(@PathVariable(value = "EntityId") String entityId){
        service.eliminar(entityId);
    }

    @PostMapping("/{EntityId}/load")
    public ResponseEntity<LocalEnt> loadFromWikidata(@PathVariable(value = "EntityId") String entityId){
        LocalEnt localEnt = service.loadFromWikidata(entityId);
        return ResponseEntity.ok(localEnt);
    }
}
