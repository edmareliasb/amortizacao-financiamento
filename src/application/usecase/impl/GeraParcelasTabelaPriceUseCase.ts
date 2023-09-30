import Amortizacao from "../../../domain/entity/Amortizacao";
import InputDadosParcela from "../../../domain/entity/InputDadosParcela";
import Parcela from "../../../domain/entity/Parcela";
import GerarParcelasUseCase from "../GerarParcelasUseCase";
import { injectable } from "tsyringe"; 

@injectable()
export default class GeraParcelaTabelaPriceUseCase implements GerarParcelasUseCase {


    gerarParcelas(input: InputDadosParcela): Amortizacao {     
        console.log('Gerando calculo de Financiamento Tabela Price');

        let saldoDevedor: number = input.getValorFinanciamento() - input.getValorEntrada();

        let txJuros: number = input.getTaxaJuros() / 100;
        
        let razaoTxJurosTempo: number = Math.pow(txJuros + 1, input.getPeriodo());

        let taxJurosMultpRazao: number = razaoTxJurosTempo * txJuros;
        let razaoTxJurosTempoMenosUm: number =  razaoTxJurosTempo - 1;
        
        let prestacao: number = saldoDevedor * (taxJurosMultpRazao / razaoTxJurosTempoMenosUm);
        prestacao = Number(prestacao.toFixed(2));

        const parcelas: Parcela[] = [];

        for (let i: number = 0; i < input.getPeriodo(); i++) {
            let valorJuros = saldoDevedor * txJuros;
            let amortizacao = prestacao - valorJuros;
            saldoDevedor -= amortizacao;
            if (saldoDevedor < 0) saldoDevedor = 0;

            const valoresArredondados = this.arredondamento({valorJuros, amortizacao, saldoDevedor});

            const parcela = new Parcela(prestacao, valoresArredondados.amortizacao, valoresArredondados.valorJuros, valoresArredondados.saldoDevedor);
            parcelas.push(parcela);            
        }

        const amortizacao = new Amortizacao(parcelas);
        return amortizacao;
    }

    private arredondamento(valores: ValoresArredondamento) {
        valores.valorJuros = Number(valores.valorJuros.toFixed(2));
        valores.amortizacao =  Number(valores.amortizacao.toFixed(2));
        valores.saldoDevedor = Number(valores.saldoDevedor.toFixed(2));
        return valores;   
    }

}

type ValoresArredondamento = {
    valorJuros: number,
    amortizacao: number,
    saldoDevedor: number;
}
