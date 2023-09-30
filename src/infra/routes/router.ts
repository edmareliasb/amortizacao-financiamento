
import { Router } from 'express';

import "reflect-metadata";
import {container} from 'tsyringe';

import GeraParcelasController from '../controller/GeraParcelasController';
import { validarCorpoDaSolicitacao } from './middleware/validarBodyGeraParcelar';
import GeraParcelaTabelaPriceUseCase from '../../application/usecase/impl/GeraParcelasTabelaPriceUseCase';

//Registrando Price para definir uma dependencia padrão
container.register("GerarParcelasUseCase", GeraParcelaTabelaPriceUseCase);
const geraParcelasController = container.resolve(GeraParcelasController);

const router = Router();
router.route('/geraparcelas').post(validarCorpoDaSolicitacao, (req, res) =>  geraParcelasController.gerarParcelas(req, res));
router.route('/health').get(geraParcelasController.healthCheck);

export default router;
