package cl.mti.wikidataApi.utils;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.model.WikiDataEntity;

public class EntityMapper {

    public static LocalEnt toLocalEntity(WikiDataEntity wikiDataEntity, String lang){
        LocalEnt local = LocalEnt.builder()
                            .Id(wikiDataEntity.getId())
                .modified(wikiDataEntity.getModified())
                .description(wikiDataEntity.getDescriptions().get(lang).getValue())
                .build();
        return local;
    }
}
