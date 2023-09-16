import Parcela from "./Parcela";

export default class Amortizacao {

    private parcelas: Parcela[] = [];

    constructor(parcelas: Parcela[]) {
        this.parcelas = parcelas;
    }

    getParcelas(): Parcela[] {
        return this.parcelas;
    }
    
    getPagamentoTotal(): number {
        const pagamentoTotal = this.parcelas.reduce(
            (pagamentoTotal, parcela) => { return pagamentoTotal + parcela.getValorParcela()}, 
            0);
        return Number(pagamentoTotal.toFixed(2));
    }

    getAmortizacaoTotal(): number {
        const amortizacaoTotal = this.parcelas.reduce(
            (amortizacaoTotal, parcela) => {return amortizacaoTotal + parcela.getAmortizacao()},
            0);

        return amortizacaoTotal;
    }

    getJurosTotal(): number {
        const jurosTotal = this.parcelas.reduce(
            (jurosTotal, parcela) => {return jurosTotal + parcela.getJuros()},
            0);

        return jurosTotal;
    }
}