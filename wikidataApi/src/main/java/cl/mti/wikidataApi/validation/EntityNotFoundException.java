package cl.mti.wikidataApi.validation;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String sucursalId){
        super("La entidad id {"+sucursalId+"} no fue encontrada");
    }
}
