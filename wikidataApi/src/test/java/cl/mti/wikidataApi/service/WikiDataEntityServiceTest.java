package cl.mti.wikidataApi.service;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.repository.WikidataLocalRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class WikiDataEntityServiceTest {

    @InjectMocks
    private WikiDataEntityService service;

    @Mock
    private WikidataLocalRepository repository;

    private final LocalEnt mockLocalEntity = new LocalEnt("Q0001","2022-01-01T00:00:00Z","test","2022-01-02T00:00:00Z");

    @Test
    void load(){
        Boolean reponse = service.loadFromWikidata();
        assertTrue(reponse);
    }
}