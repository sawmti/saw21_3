package cl.mti.wikidataApi.validation;

import cl.mti.wikidataApi.model.Error;
import cl.mti.wikidataApi.model.ErrorCodes;
import cl.mti.wikidataApi.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class WikiDataApiAdvice {

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorResponse onEntityNotFoundException(EntityNotFoundException e) {
        ErrorResponse respuestaError = new ErrorResponse();
        respuestaError.getErrores().add(new Error(ErrorCodes.ENTITY_NOT_FOUND, e.getMessage()));
        return respuestaError;
    }
}
