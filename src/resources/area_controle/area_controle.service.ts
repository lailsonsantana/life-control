import { AreaControle } from "./area_controle.resource";

class AreaControleService{

    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/api/areas-controle";

    async save(dados: AreaControle): Promise<string> {

        try{
          const response = await fetch(`${this.baseUrl}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            } ,
            body: JSON.stringify(dados),
          });
  
          if (!response.ok) {
            const errorData = await response.json(); // Tenta pegar a mensagem do backend
            throw new Error(errorData.error || 'Erro desconhecido');
          }
          const data = await response.json();

          return data;
        }
        catch (error) {
          let errorMessage = 'Erro desconhecido';

          if (error instanceof Error) {
              errorMessage = error.message;
          }
          console.error('Erro na requisição:', errorMessage);
          throw error;
        }
    }

    async getAllAreasControle() : Promise<AreaControle[]>{

        try{
          const response = await fetch(`${this.baseUrl}`);

          if (!response.ok) {
            console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: AreaControle[] = await response.json();
          return data;
        }
        catch(error){
          console.error('Erro na requisição:', error);
            throw error;
        }
    }

}

export const useAreaControleService = () => new AreaControleService();