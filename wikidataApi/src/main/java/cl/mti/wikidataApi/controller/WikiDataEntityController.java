package cl.mti.wikidataApi.controller;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.service.WikiDataEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/WikiDataEntities")
public class WikiDataEntityController {

    @Autowired
    private WikiDataEntityService service;

    @PostMapping("/load")
    public ResponseEntity<String> loadFromWikidata(){
        service.loadFromWikidata();
        return ResponseEntity.ok("ok");
    }

    @GetMapping("")
    public ResponseEntity<List<LocalEnt>> listar(){
        List<LocalEnt> entidades = service.listar();
        return ResponseEntity.ok(entidades);
    }

    @GetMapping("/{EntityId}")
    public ResponseEntity<LocalEnt> buscar(@PathVariable(value = "EntityId") String entityId){
        LocalEnt sucursal = service.buscar(entityId);
        return ResponseEntity.ok(sucursal);
    }

}
