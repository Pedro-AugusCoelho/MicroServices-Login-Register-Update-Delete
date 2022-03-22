import express from "express";
import jwtMiddlewaresAuth from "./middlewares/jwtAuth.moddlewares";
import ErrorHandle from "./middlewares/error-handle.middleweares";
import authRoute from "./Routes/authrization.route";
import statusRoute from "./Routes/status.route";
import usersRoute from "./Routes/users.route";
const app = express();

//Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Configurando Rotas
app.use(statusRoute);
app.use(authRoute);
app.use(jwtMiddlewaresAuth);
app.use(usersRoute);

//Config Errors
app.use(ErrorHandle);

//Inicializar servidor
app.listen(3000 , () => {
    console.log('Funcionando...');
});
