package cl.mti.wikidataApi.validation;

public class WikidataEntityNotFoundException extends RuntimeException{
    public WikidataEntityNotFoundException(String sucursalId){
        super("La entidad id {"+sucursalId+"} no fue encontrada en wikidata");
    }
}
