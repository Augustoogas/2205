const express=require('express');
const PORT=process.env.PORT || 3001;
const app =express();
const rutaReserva=require('./routes/reserva.route');
const rutaVehiculo=require('./routes/vehiculos.route');


app.use(express.json());

app.use("/api/reservas",rutaReserva);

app.use("/api/vehiculos",rutaVehiculo);


app.listen(PORT,()=>{console.log(`la app esta escuchando en el puerto ${PORT}`)});