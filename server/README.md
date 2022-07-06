# ExpensesApp
E3: BD SQL - App de Gastos | Backend
Expenses Tracker app - PostgreSQL + Prisma + Heroku :rocket:

# Features

:heavy_check_mark: Node
:heavy_check_mark: Express
:heavy_check_mark: Base de datos relacional PostgreSQL + Prisma
:heavy_check_mark: Deploy en Heroku
:heavy_check_mark: Autenticacion de usuarios con JSON Web Token
:heavy_check_mark: Encriptacion de contraseñas con bcrypt



# Instalacion

:heavy_check_mark: clonar repo de https://github.com/roberbaca/ExpensesApp

:heavy_check_mark: npm i

:heavy_check_mark: importar postman collection con los endpoints


# Endpoints - Register

:heavy_check_mark: POST - Crear un nuevo usuario:
https://expenses-tracker-nucba.herokuapp.com/api/auth/register

Si en rol se coloca "admin" se crea un usuario que tiene permisos para crear nuevas categorias de gastos.

Ejemplo body JSON:

{   "name": "Cosme Fulanito",
    "email": "cosmefulanito@mail.com",
    "password": "pass12345",
    "role": "admin"
}


# Endpoints - Login

:heavy_check_mark: POST - Loguearse a la app con mail y contraseña:
https://expenses-tracker-nucba.herokuapp.com/api/auth/login

Ejemplo body JSON:

{   "email": "cosmefulanito@mail.com",
    "password": "pass12345"    
}

# Endpoints - User Info

:heavy_check_mark: POST - Devuelve los datos del usuario que esta logueado:
https://expenses-tracker-nucba.herokuapp.com/api/auth/user/me



# Endpoints - Category

:heavy_check_mark: POST - Crear una nueva categoria:

Para crear una nueva categoria, se necesita el rol de administrador. Se puede crear un usuario nuevo o utilizar el siguiente:
- email: admin@mail.com
- password: pass12345

https://expenses-tracker-nucba.herokuapp.com/api/category/add 

:heavy_check_mark: GET - Consultar el listado de todos las categorias creadas:
https://expenses-tracker-nucba.herokuapp.com/api/category/all 


# Endpoints - Expenses

:heavy_check_mark: POST - Crear un nuevo gasto:
https://expenses-tracker-nucba.herokuapp.com/api/expenses/add

Ejemplo body JSON:

{   "title": "papas fritas",
    "amount": 6.74,
    "category": 1
}


:heavy_check_mark: GET - buscar todos los gastos de una determinada categoria
https://expenses-tracker-nucba.herokuapp.com/api/expenses/search

Ejemplo body JSON:

{
    "category": 4
}
 
:heavy_check_mark: GET - Consultar el monto total:
https://expenses-tracker-nucba.herokuapp.com/api/expenses/balance

 
:heavy_check_mark: GET - Consultar el monto total de una determinada categoria:
https://expenses-tracker-nucba.herokuapp.com/api/expenses/balance-by-category

Ejemplo body JSON:

{
    "category": 3
}


:heavy_check_mark: GET - Consultar el listado de todos los gastos creados:
https://expenses-tracker-nucba.herokuapp.com/api/expenses/all

