package cl.mti.wikidataApi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WikiDataResponse {
    private Map<String, WikiDataEntity> entities;
}
