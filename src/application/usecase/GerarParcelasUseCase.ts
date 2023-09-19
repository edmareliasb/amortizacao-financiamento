import Amortizacao from "../../domain/entity/Amortizacao";
import InputDadosParcela from "../../domain/entity/InputDadosParcela";

export default interface GerarParcelasUseCase {

    gerarParcelas(dadosParcela: InputDadosParcela): Amortizacao;

}