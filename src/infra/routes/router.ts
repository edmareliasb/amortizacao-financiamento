
import { Router, Request, Response } from 'express';
import GeraParcelasController from '../controller/GeraParcelasController';
import { validarCorpoDaSolicitacao } from './middleware/validarBodyGeraParcelar';
import GeraParcelaTabelaPriceUseCase from '../../application/usecase/impl/GeraParcelasTabelaPriceUseCase';
import GeraParcelaTabelaSacUseCase from '../../application/usecase/impl/GeraParcelasTabelaSacUseCase';

const router = Router();
const gerarParcelasPriceUseCase = new GeraParcelaTabelaPriceUseCase();
const gerarParcelasSacUseCase = new GeraParcelaTabelaSacUseCase();
const geraParcelasController = new GeraParcelasController(gerarParcelasPriceUseCase);

router.route('/geraparcelas').post(validarCorpoDaSolicitacao, geraParcelasController.gerarParcelas);
router.route('/health').get(geraParcelasController.healthCheck);

export default router;
