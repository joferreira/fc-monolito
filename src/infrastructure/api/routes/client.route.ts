import express, {Request, Response} from "express";
import ClientRepository from "../../../modules/client-adm/repository/client.repository";
import CreateClientUseCase from "../../../modules/client-adm/usecase/add-client/add-client.usecase"

export const clientRoute = express.Router();

clientRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateClientUseCase(new ClientRepository);
    try{
        const clientDto ={
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            state: req.body.state,
            city: req.body.city,
            zipcode: req.body.zipcode
        }

        const output = await usecase.execute(clientDto);
        res.send(output);
    } catch(err){
        res.status(500).send(err)
    }
});