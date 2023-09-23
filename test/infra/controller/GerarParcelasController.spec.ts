import Amortizacao from "../../../src/domain/entity/Amortizacao";
import Parcela from "../../../src/domain/entity/Parcela";
import GeraParcelasController from "../../../src/infra/controller/GeraParcelasController";

describe('Controller Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('when call gerar parcelar then return parcelas response', () => {
        //GIVEN
        const parcelas: Parcela[] = [
            new Parcela (5000, 1000, 4000, 4000)
        ];
        const amortizacao: Amortizacao = new Amortizacao(parcelas);

        let gerarParcelasUseCase = {gerarParcelas: jest.fn().mockReturnValue(amortizacao)}

        const request: any = {
            body: {
                valorFinanciamento: 10000,
                valorEntrada: 0, 
                taxaJuros: 1.5, 
                periodo: 12
            }
        };

        const response: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        //WHEN
        const geraParcelasController = new GeraParcelasController(gerarParcelasUseCase as any);
        geraParcelasController.gerarParcelas(request, response);

         // THEN
        expect(gerarParcelasUseCase.gerarParcelas).toHaveBeenCalledTimes(1);
        expect(gerarParcelasUseCase.gerarParcelas).toHaveBeenCalledWith({
            valorFinanciamento: 10000,
            valorEntrada: 0, 
            taxaJuros: 1.5, 
            periodo: 12
        });
        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledTimes(1);        
    })

});

