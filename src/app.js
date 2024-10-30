import express from "express";
import cors from "cors"
import routerFaturas from "./routes/faturas.js";

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}))

app.use('/',routerFaturas);
app.use('/dados/:numero_cliente/:mes_referencia',routerFaturas);
app.use('/dados/:numero_cliente',routerFaturas);
app.use('/dados',routerFaturas);
app.use('/extraiDadosPdfUnico',routerFaturas);
app.use('/extraiDadosPdfLote',routerFaturas);
export default app;
