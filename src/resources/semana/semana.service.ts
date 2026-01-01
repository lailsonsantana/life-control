import { Semana } from "./semana.resource";

class SemanaService{

    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/api/semanas";

    async save(dados: Semana): Promise<string> {

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

    async getAllSemanas() : Promise<Semana[]>{

        try{
          const response = await fetch(`${this.baseUrl}`);

          if (!response.ok) {
            console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Semana[] = await response.json();
          return data;
        }
        catch(error){
          console.error('Erro na requisição:', error);
            throw error;
        }
    }

}

export const useSemanaService = () => new SemanaService();