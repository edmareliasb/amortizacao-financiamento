import { Request, Response } from 'express';
import InputDadosParcela from '../../domain/entity/InputDadosParcela';
import GerarParcelasUseCase from '../../domain/usecase/GerarParcelasUseCase';
import GeraParcelaTabelaPriceUseCase from '../../domain/usecase/impl/GeraParcelasTabelaPriceUseCase';
import Amortizacao from '../../domain/entity/Amortizacao';
import AmortizacaoParcelasResponse from './response/AmortizacaoParcelasResponse';
import ParcelaResponse from './response/ParcelaResponse';


export default class GeraParcelasController{

    private gerarParcelasUseCase: GerarParcelasUseCase;

    constructor(geraParcelasUse: GerarParcelasUseCase) {
        this.gerarParcelasUseCase = geraParcelasUse;
        }

    healthCheck(req: Request, res: Response) {
        res.json({ message: 'hello world with Typescript'});
    }

    gerarParcelas = (req: Request, res: Response) => {
        const {valorFinanciamento, valorEntrada, taxaJuros, periodo} = req.body;

        const inputDadosParcela = new InputDadosParcela(
            Number(valorFinanciamento),
            Number(valorEntrada),
            Number(taxaJuros),
            Number(periodo)
          );

        console.log(valorFinanciamento, valorEntrada, taxaJuros, periodo);

        const amortizacao: Amortizacao = this.gerarParcelasUseCase.gerarParcelas(inputDadosParcela);
        const response = this.mapGerarParcelasResponse(amortizacao);

        res.json(response);
    }

    mapGerarParcelasResponse(amortizacao: Amortizacao): AmortizacaoParcelasResponse {
        const parcelasResponse: ParcelaResponse[] = 
            amortizacao.getParcelas().map((parcela) => {
                return new ParcelaResponse(parcela.getValorParcela(), 
                                        parcela.getAmortizacao(), 
                                        parcela.getJuros(), 
                                        parcela.getSaldoDevedor());
            });
        
        const response = new AmortizacaoParcelasResponse(
            amortizacao.getPagamentoTotal(),
            amortizacao.getAmortizacaoTotal(),
            amortizacao.getJurosTotal(),
            parcelasResponse
            );

        return response;
    }

   
}
