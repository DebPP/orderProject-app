export default interface Comanda {
    comandaId: string
    itensId: string[],
    mesa: string,
    confirmado: boolean,
    observacao: string,
    total: number
}