package cl.mti.wikidataApi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCodes {
    ENTITY_NOT_FOUND("001");

    private String code;

}
