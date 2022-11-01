<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar el comando:
```
npm install
```
3. Tener nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos en docker
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__  y renombrar la copia a __.env__

6. llenar las variables de entorno definidas en el ```env```

7. Ejecutar la aplicacion de desarrollo usando el comando 
```
npm run start:dev o nest start dev
```

8. Reconstruir la base de datos con la semilla 
```
localhost:3000/api/seed
```

## Stack utilizado
* MondoDB
* Nest