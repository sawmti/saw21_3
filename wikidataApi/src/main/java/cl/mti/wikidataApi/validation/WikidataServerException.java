package cl.mti.wikidataApi.validation;

public class WikidataServerException extends RuntimeException{
    public WikidataServerException(){
        super("Error en el servicio de wikidata");
    }
}
