<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# App en servidor privado
```
https://pokemon-munily.herokuapp.com/api/
```

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar el comando:
```
yarn install
```
3. Tener nest CLI instalado
```
yarn i -g @nestjs/cli
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

9. La documentación del servicio
```
http://localhost:3000/api#/
```

10. Para construir la imagen en docker de la aplicacion usar el siguiente comando
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack utilizado
* MondoDB
* Nest

# Notas
Heroku redeploy sin cambios
```
git commit --allow-empty -m "TiggerHeroku deploy"
git push heroku <master/main>
```