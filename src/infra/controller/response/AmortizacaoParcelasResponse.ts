import ParcelaResponse from "./ParcelaResponse";

export default class AmortizacaoParcelasResponse {

    private pagamentoTotal: number;
    private amortizacaoTotal: number;
    private jurosTotal: number;

    private parcelas: ParcelaResponse[] = [];
 
    constructor(pagamentoTotal: number, amortizacaoTotal: number, jurosTotal: number, parcelas: ParcelaResponse[]) {
        this.parcelas = parcelas;
        this.pagamentoTotal = pagamentoTotal;
        this.amortizacaoTotal = amortizacaoTotal;
        this.jurosTotal = jurosTotal;
    }
  
    getPagamentoTotal(): number {
        return this.pagamentoTotal;
    }

    getAmortizacaoTotal(): number {
        return this.amortizacaoTotal;
    }

    getJurosTotal(): number {
        return this.jurosTotal;
    } 

    getParcelas(): ParcelaResponse[] {
        return this.parcelas;
    }
}