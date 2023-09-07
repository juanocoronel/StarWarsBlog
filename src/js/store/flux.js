import axios from "axios";
let url = 'https://probable-adventure-r4ggq64rwgwxcx4wg-3000.app.github.dev'
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			people: [],
			detallepeople: {},
			planetas: [],
			detalledePlaneta: {},
			autos: [],
			detallesAuto: {},
			favorito: [],

		},
		actions: { // Función para registrar a un usuario
			signin: async (name, last_name, email, password) => {
				try {
					// Realizar una solicitud POST a la URL de registro
					let data = await axios.post(url + '/signup', {
						'name': name,
						'last_name': last_name,
						'email': email,
						'password': password
					});
					// Imprimir la respuesta en la consola
					console.log(data);
					return true;
				} catch (error) {
					// Capturar y manejar errores
					console.log(error);
					if (error.response.status === 404) {
						alert(error.response.data.msj); // Mostrar una alerta si el código de estado es 404
					}
					return false;
				}
			},

			// Función para iniciar sesión
			login: async (email, password) => {
				try {
					// Realizar una solicitud POST a la URL de inicio de sesión
					let data = await axios.post(url + '/login', {
						"email": email,
						"password": password
					});
					// Imprimir la respuesta en la consola
					console.log(data);
					// Almacenar el token en el localStorage
					localStorage.setItem("token", data.data.access_token);
					// Establecer la variable de estado 'auth' en true
					setStore({ auth: true });
					return true;
				} catch (error) {
					// Capturar y manejar errores
					// console.log(error);
					if (error.response.status === 404) {
						    alert(error.response.data.msj); // Mostrar una alerta si el código de estado es 404
					}
					return false;
				}
			},

			// Función para cerrar sesión
			logout: async () => {
				// Eliminar el token del localStorage
				localStorage.removeItem('token');
				// Establecer la variable de estado 'auth' en false
				setStore({ auth: false });
			},

			// Función para obtener el perfil del usuario
			getPerfil: async () => {
				try {
					// Realizar una solicitud GET para obtener el perfil del usuario
					let data = await axios.get('https://probable-adventure-r4ggq64rwgwxcx4wg-3000.app.github.dev/perfil', {
						headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
					});
					// Imprimir la respuesta en la consola
					console.log(data);
					return true;
				} catch (error) {
					// Capturar y manejar errores
					console.log(error);
					return false;
				}
			},

			// Función para verificar la validez del token
			validToken: async () => {
				try {
					// Realizar una solicitud GET para verificar la validez del token
					let data = await axios.get('https://probable-adventure-r4ggq64rwgwxcx4wg-3000.app.github.dev/valid-token', {
						headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
					});
					// Imprimir la respuesta en la consola
					console.log(data);
					console.log('valido');
					// Establecer la variable de estado 'auth' en true
					setStore({ auth: true });
					return true;
				} catch (error) {
					// Capturar y manejar errores
					console.log(error);
					return false;
				}
			},



			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");

			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });

			},






			/* personas */
			obtenerInfohome: async function () {
				try {
					let response = await fetch("https://swapi.dev/api/people");
					let data = await response.json();
					setStore({ people: data.results });


				} catch (error) {
					console.log(error);

				}
			},



			/* detalles de personajes*/

			obtenerInfoPerSingle: async function (num) {
				console.log(num)
				try {
					let response = await fetch("https://swapi.dev/api/people/" + num);
					let data = await response.json();

					setStore({ detallepeople: data });

				} catch (error) {
					console.log(error);

				}
			},



			/* planetas */
			obtenerInfoPlaneta: async function () {
				try {
					let response = await fetch("https://swapi.dev/api/planets");
					let data = await response.json();

					setStore({ planetas: data.results });



				} catch (error) {
					console.log(error);

				}
			},



			/* detalles de planetas*/

			obtenerPlanetaSingle: async function (num) {
				try {
					let response = await fetch("https://swapi.dev/api/planets/" + num);
					let data = await response.json();

					setStore({ detalledePlaneta: data });

				} catch (error) {
					console.log(error);

				}
			},

			//Autos
			obtenerAutos: async function () {
				try {
					let response = await fetch("https://swapi.dev/api/vehicles/");
					let data = await response.json();

					setStore({ autos: data.results });



				} catch (error) {
					console.log(error);

				}
			},

			//Detalles de autos
			obtenerAutoSingle: async function (num) {
				try {
					let response = await fetch("https://swapi.dev/api/vehicles/" + num);
					let data = await response.json();

					if (response.status === 404) {
						alert("la informacion detallada de este vehiculo no esta disponible")
					}
					setStore({ detallesAuto: data });

				} catch (error) {
					console.log(error);

				}
			},


			BorrarFavoritos: (nom) => {

				const store = getStore();

				setStore({
					...store, favorito: store.favorito.filter((item, newIndex) => {

						return nom != item
					})



				})


			},


			cargarFavorito: (nom, indi) => {
				const store = getStore();
				const actions = getActions();
				let nombrEx = false

				store.favorito.map((item, index) => {

					if (nom === item) {

						actions.BorrarFavoritos(nom)
						nombrEx = true

					}
				})

				if (nombrEx === false) {
					console.log(nombrEx)
					setStore({ ...store, favorito: [...store.favorito, nom] })
				}

			},

			CambiarColor: (nom) => {

				document.getElementById(nom).className = "far fa-heart"

			}

		}
	};
};




export default getState;

