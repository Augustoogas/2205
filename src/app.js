const express=require('express');
const PORT=proces.env.PORT || 3001;
const app =express();
const rutaReserva=require('./routes/reserva.route');

app.use(express.json());
app.use("/api/reserva",rutaReserva);

// app.use(express.json());
// app.use("/api/reserva",rutaReserva);


app.listen(PORT,()=>{console.log(`la app esta escuchando en el puerto ${PORT}`)});