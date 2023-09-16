export default class GeraParcelaRequest {

    private valorFinanciamento: number;
    private valorEntrada: number;
    private taxaJuros: number;
    private periodo: number;

    constructor(valorFinanciamento: number, valorEntrada: number, taxaJuros: number, periodo: number) {
        this.valorFinanciamento = valorFinanciamento;
        this.valorEntrada = valorEntrada;
        this.taxaJuros = taxaJuros;
        this.periodo = periodo;
    }

    public getValorFinanciamento(): number {
        return this.valorFinanciamento;
    }

    public getValorEntrada(): number {
        return this.valorEntrada;
    }

    public getTaxaJuros(): number {
        return this.taxaJuros;
    }
   
    public getPeriodo(): number {
        return this.periodo;
    }
}