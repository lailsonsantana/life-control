export class Sugestao{
    id?: number;
    descricao: string;
    areaControleId?: number;

    constructor(id: number, sugestao: string, areaControleId: number){
        this.id = id;
        this.descricao = sugestao;
        this.areaControleId = areaControleId;
    }
}