# Practica de Elias Palomo Vela de Node.js, Express y MongoBD

## Instalación
* Descargar todo el codigo: https://github.com/eliaspalomo/Practica-BackEnd-Node-KC
* Desde la ruta que se ha copiado el codigo:
   * Instalar todos los modulos necesarios si fuera necesario: npm install
   * Ejecutando el comando para inicializar la base de datos: npm run installDB
   * Ejecutando el comando para inicializar el servidor desarrollo: npm run dev
   * Ejecutando el comando para inicializar el servidor producción: npm run prod

## API de tag
### Listado
 * Ruta: http://localhost:3000/api/tag/
 * Método: GET
 * Parámatros, en la llamada:
    * tag: para filtrar por un tag
    * _id: para filtrar por un _id de Mongo
 * Resultado:
    * 200: Ok
    * 500: Error
~~~
http://localhost:3000/api/tag/
~~~

### Insertado
 * Ruta: http://localhost:3000/api/tag/
 * Método: POST
 * Parámatros, en el body:
    * tag: para el nombre del tag
 * Resultado:
    * 201: Creado en la colección
    * 500: Error
~~~
http://localhost:3000/api/tag/
tag:juegos
~~~

### Actualizado
 * Ruta: http://localhost:3000/api/tag/
 * Método: PUT
 * Parámatros, en la llamada:
    * _id: para filtrar por un _id de Mongo
 * Parámatros, en el body:
    * tag: para el nombre del tag
 * Resultado:
    * 200: modificado en la colección
    * 500: Error
~~~
http://localhost:3000/api/tag/6017e5faa525dd22482fa499
tags:juguetes
~~~

### Borrado
 * Ruta: http://localhost:3000/api/tag/
 * Método: POST
 * Parámatros, en la llamada:
    * _id: para filtrar por un _id de Mongo
 * Resultado:
    * 200: Borrado en la colección
    * 500: Error
~~~
http://localhost:3000/api/tag/6017e5faa525dd22482fa499
~~~

### Otras funciones, de los Modulos
* lista, para poder hacer el listado de los Tag, filtrando por alguno de los valores, se le pasa un objeto para el filtro
* addTags, para añadir los "tags" en caso de que falte alguno, se le pasa un array con los Tags a comprobar

## API de nodePop
### Listado
 * Ruta: http://localhost:3000/api/nodePop/
 * Método: GET
 * Parámatros, en la llamada:
    * filtro:
        * artículo: para filtrar por un artículo
        * venta: para filtrar por un venta
        * precio: para filtrar por un precio
        * tags: para filtrar por un tags
    * limit: para el límite de artículos por pagina
    * skip: para el numero de ariculos a saltar
    * fields: campos a mostrar en la respuesta
    * sort: ordenación, que campos y en que orden
    tags
    * _id: para filtrar por un _id de Mongo
 * Resultado:
    * 200: Ok
    * 500: Error
~~~
http://localhost:3000/api/nodePop/
~~~

### Insertado
 * Ruta: http://localhost:3000/api/nodePop/
 * Método: POST
 * Parámatros, en el body:
    * artículo: para el nombre del artículo
    * venta: para saber si esta en venta o compra
    * precio: para el precio en venta o compra
    * foto: cadena de la ruta del Articulo
    * tags: para los tags del artículo
 * Resultado:
    * 201: Creado en la colección
    * 500: Error
~~~
http://localhost:3000/api/nodePop/
articulo:Otra bicicleta
venta:true
precio:20
foto:bicicleta.jpg
tags:deportes
tags:juegos
tags:juguetes
~~~

### Actualizado
 * Ruta: http://localhost:3000/api/nodePop/
 * Método: PUT
 * Parámatros, en la llamada:
    * _id: para filtrar por un _id de Mongo
 * Parámatros, en el body:
    * artículo: para el nombre del artículo
    * venta: para saber si esta en venta o compra
    * precio: para el precio en venta o compra
    * foto: cadena de la ruta del Articulo
    * tags: para los tags del artículo
 * Resultado:
    * 200: modificado en la colección
    * 500: Error
~~~
http://localhost:3000/api/nodePop/601fe96c7ece131c48748d7c
articulo:Otra bicicleta
venta:true
precio:20
foto:bicicleta.jpg
tags:deportes
tags:juegos
tags:juguetes
~~~

### Borrado
 * Ruta: http://localhost:3000/api/nodePop/
 * Método: POST
 * Parámatros, en la llamada:
    * _id: para filtrar por un _id de Mongo
 * Resultado:
    * 200: Borrado en la colección
    * 500: Error
~~~
http://localhost:3000/api/nodePop/601fe96c7ece131c48748d7c
~~~

### Otras funciones, de los Modulos
* lista, para sacar el listado de los aticulos de nodePop, con los siguientes argumentos;
   * filtro, objeto con los filtros para el listado a sacar
   * limit, limite de registos-documentos a sacar
   * skip, numero de registos-documentos a saltar y que no se muestren
   * fields, lista de campo separados por comas, que nos devuleve la consulta
   * sort, objeto con el nombre del campo, y un valor 1 para ser ascendente o -1 descendente
* listaCount, para sacar el numero total de regitros con el filtro puesto, se le pasa un objeto para el filtro