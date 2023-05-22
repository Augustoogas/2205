const reservas= require('../datos/reservas.json');

//Traemos todas las reservas 
const getAll=(req,res)=>{
    res.status(200).json(reservas);
}


//vamos trayendo las reservas por id con el metodo FindIndex
const getReservasById=(req,res)=>{
    const id=req.params.id;

    const indice=reservas.findIndex(r => r.id == id);

    if(indice>=0){
        res.status(200).json(reservas[indice]);
    }else{
        res.status(404).json({mensaje:`El id ${id} no existe`});
    }
}



module.exports={getAll,getReservasById};