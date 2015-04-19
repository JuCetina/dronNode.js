console.log("Iniciando server de Node");

//Drone Control Code
var arDrone = require("ar-drone"); //Libreria que controla el dron
var miDron = arDrone.createClient(); //Crear un cliente del Parrot AR Drone

function bateria(){ //Muestra el estado de la bateria en %
	console.log("Bateria: "+miDron.battery());
}

function despegar_drone(){
	miDron.config("control:altitude_max",100000); //Hace que el dron vuele muy alto por defecto
	miDron.takeoff(); //Despega dron
	rotar_drone();
	bateria();
}

function rotar_drone(){
	miDron.stop(); //Para orden anterior
	miDron.calibrate(0); //Calibra el magnetometro del dron (brujula del dron) //Gira sobre su propio eje
	miDron.up(1); //Hace que se eleve mas
	bateria();
}

function aterrizar_drone(){
	miDron.stop(); //Para orden anterior
	miDron.land(); //Aterriza dron
	bateria();
}

//Express y Servidor Web
var express = require("express");
var web = express();
var servidor;

servidor = web.listen(8080,function(){  //Arranca servidor en express
	console.log("Servidor iniciado :D!!");
});

web.get("/", function(req,res){
	console.log ("Home");
	bateria();
	res.sendfile("opciones.html");
});

web.get("/despegar", function(req,res){
	console.log("Despegando");
	despegar_drone();	
	res.sendfile("opciones.html");
});

web.get("/aterrizar", function(req,res){
	console.log("Aterrizando");
	aterrizar_drone();	
	res.sendfile("opciones.html");
});