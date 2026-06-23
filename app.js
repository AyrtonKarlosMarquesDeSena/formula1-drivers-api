import express from "express";
import driversRouter  from './routes/drivers.js'
import teamsRouter  from './routes/team.js'
import helmet from 'helmet'


const baseRoute = "/api/v1";



const app = express();



// ele pega uma json e transforma em um objeto do javascript, para que seja possível acessar os dados do body da requisição
app.use(express.json());
app.use(helmet())
app.use(baseRoute + '/drivers', driversRouter);
app.use(baseRoute + '/teams', teamsRouter);
app.use((error, req, res, next) => {
  res.status(error.statusCode ?? 500).send(error)
})

const port = 3000;
app.listen(port, () => {
  console.log("Api rodando com sucesso!");
});


