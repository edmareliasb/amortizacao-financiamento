import Amortizacao from "../entity/Amortizacao";
import InputDadosParcela from "../entity/InputDadosParcela";

export default interface GerarParcelasUseCase {

    gerarParcelas(dadosParcela: InputDadosParcela): Amortizacao;

}