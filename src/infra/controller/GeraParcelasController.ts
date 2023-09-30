import { Request, Response } from 'express';

import "reflect-metadata";
import { injectable } from "tsyringe"; 
import { inject } from "tsyringe"; 
import { container } from 'tsyringe';

import GeraParcelaTabelaSacUseCase from '../../application/usecase/impl/GeraParcelasTabelaSacUseCase';
import GeraParcelaTabelaPriceUseCase from '../../application/usecase/impl/GeraParcelasTabelaPriceUseCase';
import GerarParcelasUseCase from '../../application/usecase/GerarParcelasUseCase';

import InputDadosParcela from '../../domain/entity/InputDadosParcela';
import AmortizacaoParcelasResponse from './response/AmortizacaoParcelasResponse';
import Amortizacao from '../../domain/entity/Amortizacao';
import ParcelaResponse from './response/ParcelaResponse';

@injectable()
export default class GeraParcelasController{

    private gerarParcelasUseCase: GerarParcelasUseCase;

    constructor(@inject("GerarParcelasUseCase") geraParcelasUse: GerarParcelasUseCase) {
        this.gerarParcelasUseCase = geraParcelasUse;
    }

    healthCheck(req: Request, res: Response) {
        res.json({ message: 'hello world with Typescript'});
    }

    gerarParcelas = (req: Request, res: Response) => {
        const {valorFinanciamento, valorEntrada, taxaJuros, periodo, tabela} = req.body;

        this.resolveTabelaCalculo(tabela);

        const inputDadosParcela = new InputDadosParcela(
            Number(valorFinanciamento),
            Number(valorEntrada),
            Number(taxaJuros),
            Number(periodo)
          );

        console.log(valorFinanciamento, valorEntrada, taxaJuros, periodo);

        const amortizacao: Amortizacao = this.gerarParcelasUseCase.gerarParcelas(inputDadosParcela);
        const response = this.mapGerarParcelasResponse(amortizacao);

        res.status(200).json(response);
    }

    private mapGerarParcelasResponse(amortizacao: Amortizacao): AmortizacaoParcelasResponse {
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

    private resolveTabelaCalculo(tabela: String) {
        if (tabela === 'PRICE') {
            this.gerarParcelasUseCase = container.resolve(GeraParcelaTabelaPriceUseCase);
        }
        if (tabela === 'SAC') {
            this.gerarParcelasUseCase = container.resolve(GeraParcelaTabelaSacUseCase);
        }
    }

}
