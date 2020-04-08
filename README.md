# HexactaLabs-.NETCore_React

Hexacta 2020

**Bienvenido a los Hexacta Labs**

Agenda:
* _Initial_: Presentación de la aplicación básica, pasos para correrla localmente y planteo de la primer actividad: Backend con .NetCore.
* _Level 1_: Se nivelará presentando una aplicación con las actividades de la etapa inicial completas. Planteo de la segunda actividad: Frontend con ReactJS.
* _Level 2_: Se presenta la aplicación con las actividades anteriores completas. Planteo de la tercera actividad: FullStack development.
* __Final: Se presenta la aplicación completa. Planteo de la actividad final.__

## [Readme General](https://github.com/lnapoliHX/HexactaLabs-NetCore_React-Initial/blob/master/README.md)

## [Documentación](https://github.com/lnapoliHX/HexactaLabs-NetCore_React-Initial/blob/master/Docs/index.md)


# Actividad Final
Para el trabajo final disponemos de una versión de la Stock Web completa con el manejo CRUD de todas las entidades tanto de backend como de frontend.
Este ejercicio final propone el modelado e implementación de un carrito de compra, para el que se necesita:

* Agregar en la tabla de productos la opción de _agregar producto al carrito_ con un botón y un campo de cantidad.
* Los productos cuyo stock sea 0 no deben habilitar la opción para agregar al carrito.
* Una nueva sección en el sitio debe mostrar el detalle del carrito con una tabla donde se muestren los productos seleccionados, la cantidad y el precio unitario. En la sección inferior de la pantalla se debe mostrar el precio total a pagar y un botón de checkout.
* Al presionar el botón para realizar la compra, el sistema debe chequear el stock disponible en ese momento para cada producto seleccionado. Si hay stock para un producto en particular, se debe actualizar la cantidad de existencias restando la cantidad que el usuario seleccionó.
* Aquellos productos que no tienen suficiente stock al momento de realizar la compra no deben ser actualizados.
* Al finalizar la compra el sistema debe mostrar al usuario una nueva página donde se muestre el detalle de qué productos pudieron reservarse y el precio total de la compra. Tener en cuenta que este precio puede ser distinto al precio que se mostró en la página anterior por falta de stock.
