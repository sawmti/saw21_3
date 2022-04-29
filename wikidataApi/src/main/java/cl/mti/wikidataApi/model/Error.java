package cl.mti.wikidataApi.model;

import lombok.Getter;

/**
 * Class to store a specific business error
 */
@Getter
public class Error {

	private String codigo;
	private String mensaje;

	public Error(ErrorCodes codigo, String mensaje) {
		this.codigo = codigo.getCode();
		this.mensaje = mensaje;
	}
}
