import {Router} from "express";
//ticket_controller

const router = Router({mergeParams : true});

router.post("/complete_ticket", async(req, res, next) =>{
    try{
        //ticket validator
        //controller Ticket
        res.json("PROVA POST");
    }
    catch(error)
    {
        next(error);
    }
});

router.get("get_ticket", async(req, res, next)=>{
    try{
        //controller.new_ticket()
        res.status(200).json("ID NEW TICKET:  ");
    }catch(error)
    {
        next(error);
    }
});

export default router;