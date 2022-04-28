package cl.mti.wikidataApi.utils;

import cl.mti.wikidataApi.model.WikiDataEntity;
import cl.mti.wikidataApi.model.WikiDataResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

public class WikidataClient {

    public static Optional<WikiDataEntity> getEntityFromWikidata(String entityStr) {

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.wikidata.org/entity/"+entityStr;
        ResponseEntity<WikiDataResponse> response = restTemplate.getForEntity(url, WikiDataResponse.class);

        // TODO validate when fail
        System.out.println("Status: "+response.getStatusCode());

        return Optional.ofNullable(response.getBody().getEntities().get(entityStr));
    }
}
