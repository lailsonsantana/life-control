export class Sugestao{
    id: number;
    sugestaoMelhoria: string;
    areaControleId: number;

    constructor(id: number, sugestao: string, areaControleId: number){
        this.id = id;
        this.sugestaoMelhoria = sugestao;
        this.areaControleId = areaControleId;
    }
}