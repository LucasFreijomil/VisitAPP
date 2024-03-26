/* NULL = FALSEY */

// let a = null;

// console.log( a ? 'Truey' : 'Falsey' );


/* INCLUDES */

// let a = [ 'Maestranza', 'Contador' ];
// a.includes


/* guardar una funcion en una variable */

// const consologear = ( x ) =>
// {
//     console.log( x );
// };

// let a = () => consologear('perrito');

// a();

/* Diferencia entre FILTER y MAP*/

// let a = [ 1, 2, 3, 40, 50, 60, 6, 7, 99 ];
// let b = a.filter( x => x<10 )

// let c = [ "1,a", "2,b", "3,c" ];
// let d = c.map( x => x.split(',')[0] );

// console.log("B: " ,b);
// console.log("D: ", d);

/* A==NULL = A==FALSE */

// let a = null;

// console.log(a?'true':'false');


/*  */

// let string = '12 de mayo de 2024';
// let string2 = string.split(' ');

// console.log("String: ", string);
// console.log("String2: ", string2);
// console.log("[0]: ", string2[0] + Number(string2[0]));
// console.log("[0] a number: ", Number(string2[0]) + Number(string2[0]));

/* PAGINADO // Tomar un pedazo de array inexistente  */

// let a = [1, 2, 3, 4, 5];

// let page = 3;
// let cardsPerView = 2;
// let totalPages = Math.ceil( a.length / cardsPerView);

// let startsAt = ( page - 1 ) * cardsPerView;
// let endsAt = page * cardsPerView;

// console.log( a.slice(startsAt, endsAt) );
// console.log("Total pages: ", totalPages);

//NOTA: Si el pedazo de array que tratamos de cortar (slice) del original no tiene
//      esa cantidad de miembros, va a mostrar los que pueda. [No tira error]

//NOTA2:    Esta es la base de un paginado, anotar y reusar a futuro.

/* .includes() */

// let a = '/guard/users';

// console.log(a.includes('guard')?'Contiene':'NO contiene');

/* comportamiento de un array vacío */

// const a = [];

// console.log(a==[]?'es un array vacío':'NO ES un array vacío');

/* concatenar un slice */

// const a = '2020-12-04:EMT20-30-40-50-60.JPG'

// console.log( a.slice(0,10) + a.slice(10) );



/* Set behaviour */

// const a = [1,2,3,3,1,3];

// let k = [ ...new Set(a) ];

// console.log("k: ", k);