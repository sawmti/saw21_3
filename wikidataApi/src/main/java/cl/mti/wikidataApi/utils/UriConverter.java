package cl.mti.wikidataApi.utils;

public class UriConverter {
    private static String wikidataUrl = "http://www.wikidata.org/entity/";

        public static String getEntityFromUri(String uri){
        return uri.replace(wikidataUrl,"");
    }
}
