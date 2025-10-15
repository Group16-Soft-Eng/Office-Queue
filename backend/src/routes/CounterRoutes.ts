import {Router} from "express";
import {openCounter, addCounterService,removeCounterService, getAllCounters} from "@controllers/CounterController"
import {serveNextClient,getAllQueues} from "@controllers/QueueController"
const router = Router({mergeParams : true});

router.post("/register_counter", async(req, res, next) =>{
    try{
        const res_json = openCounter(req.body["id"]);
        console.log(res_json)
        req.body["services"].forEach(element => {
            console.log(element)
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
        const id_counter = req.query.id_counter as string;
        
        const counters = getAllCounters();
        const counter = counters.find(c => c.counter_id === parseInt(id_counter));
        
        if (!counter || !counter.is_active) {
            return res.status(400).json({ error: "Counter not found or inactive" });
        }
        const queues = getAllQueues();
        let longestQueue = null;
        let maxLength = -1;
        
        counter.services?.forEach(service_type => {
            const serviceQueues = queues.filter(q => q.service_type === service_type);
            serviceQueues.forEach(queue => {
                if (queue.ticket_list.length > maxLength) {
                    maxLength = queue.ticket_list.length;
                    longestQueue = queue;
                }
            });
        });2
        
        if (!longestQueue || longestQueue.ticket_list.length === 0) {
            return res.status(200).json({ message: "No customers waiting" });
        }
        
        const result = serveNextClient(longestQueue.service_type);        
        if (result) {
            res.status(200).json({
                id_ticket: result.old_ticket,
                service_type: longestQueue.service_type
            });
        } else {
            res.status(200).json({ message: "No customers to serve" });
        }
        
    }catch(error){
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