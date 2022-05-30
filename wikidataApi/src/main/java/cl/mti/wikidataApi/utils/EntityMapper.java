package cl.mti.wikidataApi.utils;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.model.WikiDataEntity;

import java.util.Objects;

public class EntityMapper {

    public static LocalEnt toLocalEntity(WikiDataEntity wikiDataEntity, String lang){

        String description = Objects.isNull(wikiDataEntity.getDescriptions().get(lang))?
                Objects.isNull(wikiDataEntity.getDescriptions().get("en"))? "No description available": wikiDataEntity.getDescriptions().get("en").getValue()
                :wikiDataEntity.getDescriptions().get(lang).getValue();

        LocalEnt local = LocalEnt.builder()
                            .Id(wikiDataEntity.getId())
                .modified(wikiDataEntity.getModified())
                .description(description)
                .build();
        return local;
    }
}
