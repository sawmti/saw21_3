package cl.mti.wikidataApi.utils;

import cl.mti.wikidataApi.model.LocalEnt;
import cl.mti.wikidataApi.model.WikiDataEntity;

import java.util.Objects;

public class EntityMapper {

    public static LocalEnt toLocalEntity(WikiDataEntity wikiDataEntity, String lang){

        String description = Objects.isNull(wikiDataEntity.getDescriptions().get(lang))?
                Objects.isNull(wikiDataEntity.getDescriptions().get("en"))? "No description available": wikiDataEntity.getDescriptions().get("en").getValue()
                :wikiDataEntity.getDescriptions().get(lang).getValue();

        String label = Objects.isNull(wikiDataEntity.getLabels().get(lang))?
                Objects.isNull(wikiDataEntity.getLabels().get("en"))? "No label available": wikiDataEntity.getLabels().get("en").getValue()
                :wikiDataEntity.getLabels().get(lang).getValue();

        String uri = Objects.isNull(wikiDataEntity.getSitelinks().get(lang+"wiki"))?
                Objects.isNull(wikiDataEntity.getSitelinks().get("enwiki"))? "No url available": wikiDataEntity.getSitelinks().get("enwiki").getUrl()
                :wikiDataEntity.getSitelinks().get(lang+"wiki").getUrl();

        LocalEnt local = LocalEnt.builder()
                            .Id(wikiDataEntity.getId())
                .modified(wikiDataEntity.getModified())
                .description(description)
                .label(label)
                .uri(uri)
                .build();
        return local;
    }
}
