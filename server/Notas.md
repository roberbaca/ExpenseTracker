BD SQL - App de Gastos | Backend

- Utilizar PostgreSQL como DB
- Prisma como ORM
- Heroku para deployar la DB

MVP:

1 - Definir modelo de datos (schema.prisma). Establecer entidades y como se relacionan (hacer flujo de inciar Prisma)
2 - Crear infraestructura (heroku)
   2.1 - Conectar su app a la DB con las conexiones en el .env
3 - Correr migraciones (npx prisma migrate dev--name nombremigracion)
4 - Crear conexion a Prisma ( ver como hacemos el new PrismaClient() )
5 - Modificar el modelo guardado de datos para usar la DB en lugar de filesystem

------------------------------------------------------------------------------------------------------------------------

Crear API:

6 - Instalar Express y crear app de express
7 - Definir y crear rutas para reemplazar los comandos
8 - Crear los controllers para cada comando/ruta 

// Fuel
// Clothes
// Entertainment
// Gifts
// Holidays
// Shopping
// Sports
// Travel
// Food
// General