# Base de datos no relacionales
## Subsistema: Wikis

Esta implementacion busca representar lo que seria el subsistema para manejar las Wikis desde Github.
Este substiema utiliza una base de datos de MongoDb la cual se encuentra online en el proveedor Atlas. 
Nuestra aplicacion contiene el driver necesario de NodeJS para conectarse a esta base de datos y realizar las operaciones necesarias. 

Version de NodeJS utilizada para el desarrollo : v12.18.0
## Requisitos para correrlo localmente
+ Asegurarse de tener instalado NodeJS. 

## Pasos para la instalacion: 
1. Clonar la solucion con el comando **git clone https://github.com/andresorrego94/bd_no_relacionales.git**
2. Abrir una terminal e navegar hasta el directorio clonado y acceder a la carpeta /bd_no_relacionales
3. Correr el comando para instalar las dependencias necesarios: **npm i**
4. Una vez instalados los node_modules, corremos la applicacion con el comando: **npm start**
5. Acceder a la direccion **http://localhost:3000** para visualizar 

## Manual de usuario

+ Seccion crear wiki:
Se debe ingresar un ID de repositorio y presionar **Create wiki** , la cual representa a que Repositorio pertenece la Wiki. En este caso se ingresa manualmente, pero una vez integrado el subsistema a Github se deberia tomar automaticamente al crear el repositorio.

+ Seccion agregar nueva pagina: 
Se completa el formulario con el objetivo de agregar una pagina nueva a la Wiki. Se ingresa el titulo, creador y el contenido.

+ Seccion editar: 
Esta seccionse utiliza para crear una version del sistema, agregando tambien el campo de **Edition Message**, donde se agrega el motivo de la edicion. 
Luego de editar esta version se pueden ver los campos actualizados en el **WikiDetail**. 

+ Seccion ver historial:
Esta seccion le permite ver el historial de ediciones que tubo cada pagina de la wiki. Se crea un historial por pagina. 

+ Frame de data desde MongoDb 
Debajo de cada pagina de la aplicacion se muestra un frame con la informacion tal cual la tomamos desde MongoDB. Se puede visualizar la estructura de la data que proviene desde la base de datos en el formato JSON. Ahi se puede visualizar como la entidad **Page**, almacena su propio historial y datos, como tambien tambien se visualiza que se crea una entidad **Wiki** para representar a donde pertenece la **Page**.

## Link del sistema funcionando: 
**http://wikismanagerbdnr.azurewebsites.net/**

