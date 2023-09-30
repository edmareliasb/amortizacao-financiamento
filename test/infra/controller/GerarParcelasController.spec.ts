import { container } from 'tsyringe';

import Amortizacao from "../../../src/domain/entity/Amortizacao";
import Parcela from "../../../src/domain/entity/Parcela";
import GeraParcelasController from "../../../src/infra/controller/GeraParcelasController";
import GerarParcelasUseCase from "../../../src/application/usecase/GerarParcelasUseCase";

describe('Controller Tests', () => {
    let mockResponse: any;
    let geraParcelasController: GeraParcelasController;
    let mockTabelaCalculoImpl = jest.fn();


    beforeEach(() => {
        jest.clearAllMocks();

        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        
        container.register("GerarParcelasUseCase", mockTabelaCalculoImpl);
        geraParcelasController = container.resolve(GeraParcelasController);
    });

    it('when call gerar parcelar then return parcelas response', () => {
        //GIVEN
        const parcelas: Parcela[] = [
            new Parcela (5000, 1000, 4000, 4000)
        ];
        const amortizacao: Amortizacao = new Amortizacao(parcelas);

         // Mock da implementação de GerarParcelasUseCase para evitar chamadas reais ao serviço
        let gerarParcelasUseCaseMock = {gerarParcelas: jest.fn().mockReturnValue(amortizacao)}

        jest.spyOn(container, 'resolve').mockReturnValue(gerarParcelasUseCaseMock);

        const request: any = {
            body: {
                valorFinanciamento: 10000,
                valorEntrada: 0, 
                taxaJuros: 1.5, 
                periodo: 12,
                tabela: 'SAC'
            }
        };

        //WHEN
        geraParcelasController.gerarParcelas(request, mockResponse);

         // THEN
        expect(gerarParcelasUseCaseMock.gerarParcelas).toHaveBeenCalledTimes(1);
        expect(gerarParcelasUseCaseMock.gerarParcelas).toHaveBeenCalledWith({
            valorFinanciamento: 10000,
            valorEntrada: 0, 
            taxaJuros: 1.5, 
            periodo: 12
        });
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);        
    });

    it('should respond with hello world on health check', () => {
        // Mock the dependency injection
        const mockUseCase = {} as GerarParcelasUseCase;
        const controller = new GeraParcelasController(mockUseCase);
        
        
        controller.healthCheck({} as any, mockResponse as any);

        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'hello world with Typescript' });
    });

});

