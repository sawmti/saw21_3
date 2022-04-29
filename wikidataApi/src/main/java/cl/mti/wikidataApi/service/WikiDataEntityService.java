package cl.mti.wikidataApi.service;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.repository.WikidataLocalRepository;
import cl.mti.wikidataApi.utils.EntityMapper;
import cl.mti.wikidataApi.utils.WikidataClient;
import cl.mti.wikidataApi.validation.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Service
public class WikiDataEntityService {

    @Autowired
    private WikidataLocalRepository repository;

    public Boolean loadFromWikidata(){
        // TODO should use dynamic list?
        List<String> list = Arrays.asList("Q84263196","Q87775025","Q97154240","Q97154233","Q98270627");
        list.forEach( strEntity -> {
             LocalEnt local = EntityMapper.toLocalEntity(WikidataClient.getEntityFromWikidata(strEntity).get(),"es");
             repository.saveAndFlush(local);
        });
        return true;
    }


    public List<LocalEnt> listar() {
        return repository.findAll();
    }

    public LocalEnt buscar(String entityId) {
        return repository.findById(entityId).orElseThrow(() ->new EntityNotFoundException(entityId));
    }

    public LocalEnt actualizar(String entityId, LocalEnt entity) {
        if (!repository.existsById(entityId)) throw new EntityNotFoundException(entityId);

        entity.setId(entityId);
        entity.setUpdatedDate(Instant.now().toString());
        return repository.saveAndFlush(entity);
    }

    @Transactional
    public void eliminar(String entityId) {
        if (!repository.existsById(entityId)) throw new EntityNotFoundException(entityId);

        repository.deleteById(entityId);
    }

    public LocalEnt loadFromWikidata(String entityId) {
        LocalEnt local = EntityMapper.toLocalEntity(WikidataClient.getEntityFromWikidata(entityId).get(),"es");
        repository.saveAndFlush(local);
        return local;
    }
}
