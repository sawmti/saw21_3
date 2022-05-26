package cl.mti.wikidataApi.utils;

import cl.mti.wikidataApi.model.WikiDataEntity;
import cl.mti.wikidataApi.model.WikiDataResponse;
import cl.mti.wikidataApi.model.sparql.ItemResponse;
import cl.mti.wikidataApi.model.sparql.SparqlResponse;
import cl.mti.wikidataApi.validation.WikidataEntityNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.*;

public class WikidataClient {
 private static ObjectMapper mapper = new ObjectMapper();
    //private static final String innerSelect = "{ SERVICE wikibase:label { bd:serviceParam wikibase:language \"es\". }  {SELECT DISTINCT ?item WHERE {?item p:P1924 ?statement0. ?statement0 (ps:P1924/(wdt:P279*)) wd:Q84263196. } LIMIT 4 } }";
    private static final String innerSelect = "{?item p:P1924 ?statement0. ?statement0 (ps:P1924/(wdt:P279*)) wd:Q84263196. SERVICE wikibase:label { bd:serviceParam wikibase:language \"es\". }}";
    private static final String wdQueryVaccines = "SELECT DISTINCT ?item ?itemLabel WHERE {innerSelect} LIMIT 4";

    public static Optional<WikiDataEntity> getEntityFromWikidata(String entityStr) {
        System.out.println("entity: "+entityStr);
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.wikidata.org/entity/"+entityStr;
        ResponseEntity<WikiDataResponse> response;
        try {
            response = restTemplate.getForEntity(url, WikiDataResponse.class);
        }catch (Exception e){
            throw new WikidataEntityNotFoundException(entityStr);
        }

        return Optional.ofNullable(Objects.isNull(response.getBody().getEntities())? null:response.getBody().getEntities().get(entityStr));
    }

    public static Optional<List<ItemResponse>> getCovidVaccines ()  {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://query.wikidata.org/sparql?query="+wdQueryVaccines+"&format=json";

        ResponseEntity<SparqlResponse> response;
        try {
            response = restTemplate.getForEntity(url, SparqlResponse.class, innerSelect);
            System.out.println( "body: "+mapper.writeValueAsString(response.getBody()));

        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new WikidataEntityNotFoundException("Q84263196");
        }
        return Optional.ofNullable(Objects.isNull(response.getBody().getResults())? null:response.getBody().getResults().getBindings());
    }
}
