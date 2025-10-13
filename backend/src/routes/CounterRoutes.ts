import {Router} from "express";
import {openCounter, addCounterService,removeCounterService} from "@controllers/CounterController"
import {serveNextClient,getAllQueues} from "@controllers/QueueController"
const router = Router({mergeParams : true});

router.post("/register_counter", async(req, res, next) =>{
    try{
        let res_json = openCounter(req.body["id"]);
        req.body["services"].forEach(element => {
            addCounterService(req.body["id"], element, true)
        });
        res.status(200).json(res_json)
    }
    catch(error)
    {
        next(error);
    }
});

router.get("/next_customer", async(req, res, next)=>{
    try{   
        res.status(200).json("WIP")
    }catch(error)
    {
        next(error);
    }
});


router.put("/keep_alive", async(req, res, next) =>{
    try{
        res.status(200).json("WIP");
    }catch(error){
        next(error);
    }
})

router.delete("/logout_counter", async(req,res,next)=>{
    try{
        removeCounterService(req.body["id"],"s0");
        removeCounterService(req.body["id"],"s1");
        removeCounterService(req.body["id"],"s2");
        removeCounterService(req.body["id"],"s3");
        res.status(200).json("Terminal LoggedOut");
    }catch(error){
        next(error);
    }
})
export default router;