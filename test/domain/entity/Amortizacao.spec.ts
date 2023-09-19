import Amortizacao from "../../../src/domain/entity/Amortizacao"
import Parcela from "../../../src/domain/entity/Parcela";

describe('Amortizacao Tests', () => {

    it('constructs', () => {
        const parcelas: Parcela[] = [
            new Parcela(3000, 1000, 200, 5000),
            new Parcela(3000, 1000, 200, 5000),
        ];

        const amortizacaoEntity: Amortizacao = new Amortizacao(parcelas);

        expect(amortizacaoEntity).toBeDefined();
        expect(amortizacaoEntity.getParcelas()).toBeDefined();
        expect(amortizacaoEntity.getParcelas().length).toEqual(2);
    })

    it('Getter Methods', () => {
        const parcelas: Parcela[] = [
            new Parcela(3000, 1000, 200, 10000),
            new Parcela(4000, 2000, 300, 6000),
        ];

        const amortizacaoEntity: Amortizacao = new Amortizacao(parcelas);

        expect(amortizacaoEntity.getParcelas().length).toEqual(2);
        expect(amortizacaoEntity.getParcelas()[0].getSaldoDevedor()).toEqual(10000);
        expect(amortizacaoEntity.getParcelas()[1].getSaldoDevedor()).toEqual(6000);

        expect(amortizacaoEntity.getPagamentoTotal()).toEqual(7000);
        expect(amortizacaoEntity.getAmortizacaoTotal()).toEqual(3000);
        expect(amortizacaoEntity.getJurosTotal()).toEqual(500);
    })
})