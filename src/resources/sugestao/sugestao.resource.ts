export class Sugestao{
    id: number;
    sugestaoMelhoria: string;

    constructor(id: number, sugestao: string){
        this.id = id
        this.sugestaoMelhoria = sugestao
    }
}