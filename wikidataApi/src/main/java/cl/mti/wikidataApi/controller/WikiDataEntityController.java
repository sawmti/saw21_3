package cl.mti.wikidataApi.controller;

import cl.mti.wikidataApi.service.WikiDataEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
