const reservas= require('../datos/reservas.json');
const vehiculos= require('../datos/vehiculos.json');

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


//encontramos el indice y lo borramos con splice()
const deleteReservasById=(req,res)=>{
    const id=req.params.id;

    const indice=reservas.findIndex(r => r.id == id);

    if(indice>=0){
        reservas.splice(indice,1);
        res.status(200).json({mensaje:`La reserva con el id ${id} fue borrado con exito`});
    }else{
        res.status(404).json({mensaje:`El id ${id} no existe`});
    }

}


//Aqui creamos una reserva

const postReservas=(req,res)=>{
    const bodyDatos=req.body;
    
    const vehiculoHabilitado=vehiculos.find(v => v.habilitado &&
        v.capacidad >= bodyDatos.cantPersonas && v.autonomiaKms>=bodyDatos.distancia);
    

    //Establecemos el mayor id
    const ids=reservas.map( r => r.id);
    mayorId=Math.max(...ids)+1;

    //una expresion regular(regex) para validar la fecha
    const re=/\d{8}/;
    
    
    //validacion de datos y creacion de la reserva
    if(((bodyDatos.cantPersonas >=1 && req.body.cantPersonas<=10) && bodyDatos.distancia < 500  
    && re.test(bodyDatos.fecha)&& vehiculoHabilitado!=undefined)){
        const reservaNueva={
            "id":mayorId,
            "cliente": bodyDatos.cliente,
            "cantPersonas":bodyDatos.cantPersonas,
            "distancia": bodyDatos.distancia,
            "fecha":bodyDatos.fecha ,
            "vehiculo":vehiculoHabilitado
        }

        
        
        

        reservas.push(reservaNueva);
        res.status(201).json(reservaNueva);


    }else if(vehiculoHabilitado==undefined){
        res.status(400).json({mensaje:`No un auto disponible para los requisitos que pide`});
    }
    
    else{
        //mensaje de error si alguno de los datos esta mal ingresado
        res.status(400).json({mensaje:"Ingrese los datos correctamente"});
    }
}


const encontrarUltimaReserva=(req,res)=>{
    const cliente=req.params.cliente;
    const existe=reservas.find(r => r.cliente==cliente);
    
    if(existe){
        const reservasClientes=reservas.filter(r => r.cliente == cliente);

        const ultimaReserva=reservasClientes.length-1;

        res.status(200).json({"ultima reserva":reservas[ultimaReserva]});

    }else{
        res.status(404).json({mensaje:'No encontrado'})
    }

    
}

module.exports={getAll,getReservasById,deleteReservasById,postReservas,encontrarUltimaReserva};