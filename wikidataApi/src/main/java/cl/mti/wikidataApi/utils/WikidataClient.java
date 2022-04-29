package cl.mti.wikidataApi.utils;

import cl.mti.wikidataApi.model.WikiDataEntity;
import cl.mti.wikidataApi.model.WikiDataResponse;
import cl.mti.wikidataApi.validation.WikidataEntityNotFoundException;
import cl.mti.wikidataApi.validation.WikidataServerException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

public class WikidataClient {

    public static Optional<WikiDataEntity> getEntityFromWikidata(String entityStr) {

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.wikidata.org/entity/"+entityStr;
        ResponseEntity<WikiDataResponse> response = restTemplate.getForEntity(url, WikiDataResponse.class);

        System.out.println("Status: "+response.getStatusCode());

        if (response.getStatusCode().value() >= 400 && response.getStatusCode().value() <= 499)
            throw new WikidataEntityNotFoundException(entityStr);
        else if (response.getStatusCode().value() >= 500 && response.getStatusCode().value() <= 599)
            throw new WikidataServerException();

        return Optional.ofNullable(response.getBody().getEntities().get(entityStr));
    }
}
