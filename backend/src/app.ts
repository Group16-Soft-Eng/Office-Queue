    import express from "express";
import {CONFIG} from "@config";
import cors from "cors"

import counter_routes from "@routes/CounterRoutes"


export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use(
    CONFIG.COUNTER_ROUTE, counter_routes
);