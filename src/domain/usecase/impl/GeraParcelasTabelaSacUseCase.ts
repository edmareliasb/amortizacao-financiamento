import Amortizacao from "../../entity/Amortizacao";
import InputDadosParcela from "../../entity/InputDadosParcela";
import Parcela from "../../entity/Parcela";
import GerarParcelasUseCase from "../GerarParcelasUseCase";

export default class GeraParcelaTabelaSacUseCase implements GerarParcelasUseCase {


    public gerarParcelas(input: InputDadosParcela): Amortizacao {        
        let saldoDevedor: number = input.getValorFinanciamento() - input.getValorEntrada();
        
        let peridoContrato: number = input.getPeriodo();
        
        let txJuros: number = input.getTaxaJuros() / 100;
        
        const parcelas: Parcela[] = [];
        for (let i: number = 0; i < peridoContrato; i++) {
            // amortizacao e igual ao saldo devedor dividor pela quantidade de meses que faltam para pagar.
            let amortizacao = saldoDevedor / (peridoContrato -i);
            let valorJuros = saldoDevedor * txJuros;
            let prestacao = amortizacao + valorJuros;

            saldoDevedor -= amortizacao;

            const valoresArredondados = this.arredondamento({prestacao, amortizacao, valorJuros, saldoDevedor});

            const parcela = new Parcela(valoresArredondados.prestacao, valoresArredondados.amortizacao, valoresArredondados.valorJuros, valoresArredondados.saldoDevedor);
            parcelas.push(parcela);

            console.log('Prestacao SAC: %s Juros: %s Amortizacao: %s Saldo Devedor: %s', 
                prestacao, valoresArredondados.valorJuros, valoresArredondados.amortizacao, valoresArredondados.saldoDevedor);
        }

        const amortizacao = new Amortizacao(parcelas);
        return amortizacao;
    }

    private arredondamento(valores: ValoresArredondamento) {
        valores.prestacao = Number(valores.prestacao.toFixed(2));
        valores.amortizacao =  Number(valores.amortizacao.toFixed(2));
        valores.valorJuros = Number(valores.valorJuros.toFixed(2));
        valores.saldoDevedor = Number(valores.saldoDevedor.toFixed(2));
        return valores;   
    }

}

type ValoresArredondamento = {
    prestacao: number,
    amortizacao: number,
    valorJuros: number,
    saldoDevedor: number;
}
