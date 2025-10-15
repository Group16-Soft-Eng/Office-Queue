import {Router} from "express";
import {getAllQueues, addTicket} from "@controllers/QueueController"
//ticket_controller

const router = Router({mergeParams : true});

let id_ticket = 0;


router.post("/complete_ticket", async(req, res, next) =>{
    try{        
        res.json("PROVA POST");
    }
    catch(error)
    {
        next(error);
    }
});

router.get("/get_ticket", async(req, res, next)=>{
    try{
        const id_service = req.query.s_type;
        if(id_service == undefined || id_service <0 || id_service > 4 )
            res.status(400).json("ERROR MESSAGE")
        addTicket(id_service, id_ticket)
        id_ticket++;
        res.status(200).json( {
            id_ticket: id_ticket
        });
    }catch(error)
    {
        next(error);
    }
});

export default router;