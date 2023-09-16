export default class Parcela {

    private valorParcela: number;
    private amortizacao: number;
    private juros: number;
    private saldoDevedor: number;

    constructor(valorParcela: number, amortizacao: number, juros: number, saldoDevedor: number) {
        this.valorParcela = valorParcela;
        this.amortizacao = amortizacao;
        this.juros = juros;
        this.saldoDevedor = saldoDevedor;
    }

    getValorParcela(): number {
        return this.valorParcela;
    }

    getAmortizacao(): number {
        return this.amortizacao;
    }

    getJuros(): number {
        return this.juros;
    }

    getSaldoDevedor(): number {
        return this.saldoDevedor;
    }

}