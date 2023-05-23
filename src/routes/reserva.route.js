const express=require('express');
const route=express.Router();
const controllerReservas=require('../controllers/reservas.controller');


route.get("/",controllerReservas.getAll);
route.get("/:id",controllerReservas.getReservasById);

route.get("/search/:cliente",controllerReservas.encontrarUltimaReserva);

route.delete("/:id",controllerReservas.deleteReservasById);


route.post("/",controllerReservas.postReservas);




module.exports=route;