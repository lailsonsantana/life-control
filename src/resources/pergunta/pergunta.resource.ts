export class Pergunta{
    id?: number;
    textoPergunta: string;
    areaControleId?: number;

    constructor(id: number, textoPergunta: string, areaControleId: number){
        this.id = id;
        this.textoPergunta = textoPergunta;
        this.areaControleId = areaControleId;
    }
}