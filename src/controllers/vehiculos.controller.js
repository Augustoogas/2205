const vehiculos= require('../datos/vehiculos.json');


//Traemos todos los vehiculos
const getAll=(req,res)=>{
    res.status(200).json(vehiculos);
}


//vamos trayendo las reservas por id con el metodo FindIndex
const getVehiculosByPatente=(req,res)=>{
    const patente=req.params.patente;

    const indice=vehiculos.findIndex(r => r.patente == patente);

    if(indice>=0){
        res.status(200).json(vehiculos[indice]);
    }else{
        res.status(404).json({mensaje:`La patente ${patente} no existe`});
    }
}


// const deleteVehiculoByPatente=(req,res)=>{
//     const patente=req.params.patente;

//     const indice=vehiculos.findIndex(v => v.patente == patente);

//     if(indice>=0){
//         vehiculos.splice(indice,1);
//         res.status(200).json({mensaje:`El vehiculo con la patente ${id} fue borrado con exito`});
//     }else{
//         res.status(404).json({mensaje:`La patente ${patente} no existe`});
//     }

// }

const createVehiculo = (req,res)=>{
    const vehiculoNuevo=req.body;


    const rePatente=/\d{7}/;


    const existe=vehiculos.find(v=>v.patente == vehiculoNuevo.patente);

    if(!existe){
        
        if(rePatente.test(vehiculoNuevo.patente) && (vehiculoNuevo.capacidad>=1 && vehiculoNuevo.capacidad <=10) 
        && vehiculoNuevo.autonomiaKms >=0){

            if(vehiculoNuevo.habilitado){
                vehiculoNuevo.habilitado==false;
            }
            vehiculos.push(vehiculoNuevo);

            res.status(201).json({mensaje:"El vehiculo fue creado correctamente"});

            
        }else{
            res.status(400).json({mensaje:"No se pudo generar el vehiculo por que lo datos estan mal ingresados"});
        }
    }else{
        res.status(400).json({mensaje:"La patente ingresada ya existe"});
    }
}



const updateVehiculo=(req,res)=>{
    const bodyValue=req.body;
    const patente=req.params.patente;

    const indice=vehiculos.findIndex(r => r.patente == patente);
    if(indice>=0){    
        if((bodyValue.capacidad>=1 && bodyValue.capacidad<=10) && bodyValue.autonomiaKms>=0){
            vehiculos[indice].habilitado=bodyValue.habilitado;
            vehiculos[indice].capacidad=bodyValue.capacidad
            vehiculos[indice].autonomiaKms=bodyValue.autonomiaKms;

        res.status(201).json({"vehiculo": vehiculos[indice]});
            
        }else{
            res.status(404).json("No se pudo actualizar el vehiculo por que lo datos estan mal ingresados");
        }

    }else{
        res.status(404).json("La patente que ingreso no existe");

    }

   
}


module.exports={getAll,getVehiculosByPatente,createVehiculo,updateVehiculo};


