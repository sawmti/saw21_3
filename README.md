# :school: Sistemas y Aplicaciones Web :school:
## Ejercicio 1: Grupo 3
_Aplicación que interactúa con wikidata_

La app está compuesta por un backend construido con Springboot y un frontend con React, ambos corren sobre contenedores docker independientes desplegados en Heroku.

Funcionalmente hablando, la app obtiene las entidades relacionas (_"vacuna para"_) a la entidad Covid-19 (_"Q84263196"_) mediante una query de Sparql al cargar por primera vez (con un límite de 4 entidades), estas son almacenadas en una base de datos H2, la cual corre en memoria, sobre esta es posible realizar un CRUD. El "create" requiere de un código de entidad, con el cual se consulta wikidata para traer el resto de la información.   

## Autores :mortar_board::wrench:
* Katherine Gaete
* Mario Colihueque
* Luis Montanares
* Leonardo Fuentes

## Comenzando 🚀

_El código está disponible en el repositorio github:_
```
https://github.com/sawmti/saw21_3
```
## Uso ⌨️

### Front end

La aplicación esta disponible en la ruta a través de una navegador web (usar Chrome):
```
https://frontwikidata1.herokuapp.com
```
Username: * \
Password: *

### Api
La Api esta disponible en la ruta para consultas:
```
https://apiwikidata1.herokuapp.com/WikiDataEntities
```
* Ejemplos:
  * Listar: \
  ```curl --location --request GET 'https://apiwikidata1.herokuapp.com/WikiDataEntities'```
  * borrar: \
  ```curl --location --request DELETE 'https://apiwikidata1.herokuapp.com/WikiDataEntities/Q87775025'```
  * Actualizar: \
  ```curl --location --request PUT 'https://apiwikidata1.herokuapp.com/WikiDataEntities/Q87775025' --header 'Content-Type: application/json' --data-raw '{"description": "vacuna de ARNm contra la COVID-19 de Moderna actualizada"}'```
  * Crear con Id: \
  ```curl --location --request POST 'https://apiwikidata1.herokuapp.com/WikiDataEntities/Q1271102/load'```
## Construido con 🛠️

_Las siguientes herramientas se usaron durante el desarrollo_

* [Intellij](https://www.jetbrains.com/idea/)
* [Spring Boot](https://spring.io/projects/spring-boot#overview)
* [Maven](https://maven.apache.org/) 
* [Docker](https://www.docker.com)
* [React](https://reactjs.org/)
* [Heroku](https://www.heroku.com)
* [GitHub](https://github.com/)

# CHANGELOG 💅 💥 🐛

## 1.0.0 - 29-05-2022
### Added
- Initial version.
