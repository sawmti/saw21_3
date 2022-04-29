package cl.mti.wikidataApi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCodes {
    ENTITY_NOT_FOUND("001"),
    WIKIDATA_ENTITY_NOT_FOUND("002"),
    WIKIDATA_SERVER_ERROR("003");

    private String code;

}
