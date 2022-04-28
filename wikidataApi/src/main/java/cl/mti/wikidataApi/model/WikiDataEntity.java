package cl.mti.wikidataApi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class WikiDataEntity {
    private String id;
    private String modified;
    private String type;
    private Map<String, WikiDataLanguajeValue> descriptions;
}
