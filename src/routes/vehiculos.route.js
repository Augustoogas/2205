const express=require('express');
const route=express.Router();
const controllerVehiculos=require('../controllers/vehiculos.controller');


route.get("/",controllerVehiculos.getAll);
route.get("/:patente",controllerVehiculos.getVehiculosByPatente);

route.post("/",controllerVehiculos.createVehiculo);

route.put("/:patente",controllerVehiculos.updateVehiculo);


module.exports=route;