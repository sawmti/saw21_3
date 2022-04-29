package cl.mti.wikidataApi.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ErrorResponse {
	
	private List<Error> errores = new ArrayList<>();

}
