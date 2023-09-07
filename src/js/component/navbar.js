import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	/* 
		let motora = [store.favorito]
		console.log("motoloco: " + motora);
	 */

	return (
		<div className=" bg-dark bg-opacity-75">
			<nav className="navbar navbar-light mb-3" style={{ padding: "0px 180px 0px 180px" }}>
				<a href="/">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png"
						alt="logoStarWars"
						style={{ width: '100px', height: 'auto' }}
					/>
				</a>
				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						id="dropdownMenuButton1"
						data-bs-toggle="dropdown"
						aria-expanded="false">
						Favoritos
						<span className="badge bg-secondary mx-2">{store.favorito.length}</span>
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
						{store.favorito.map((item, index) => {

							return (
								<li key={index}>
									<div key={index}>
										<div className="d-flex justify-content-between" style={{ width: '90%' }} index={index}>{item}
											< a className="text-danger" onClick={() => { actions.BorrarFavoritos(item), actions.CambiarColor(item) }}>
												<i className="far fa-trash-alt"></i>
											</a>
										</div>
									</div>
								</li>
							)
						})}
					</ul>
				</div>
				<Link to={"/login"}>
					<button className="btn btn-warning" type="button" onClick={() => actions.logout()}>
						Cerrar Sesion
					</button>
				</Link>
			</nav>
		</div>
	);
};
