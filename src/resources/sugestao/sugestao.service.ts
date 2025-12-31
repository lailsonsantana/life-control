import { Sugestao } from "./sugestao.resource";

class SugestaoService{

    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + "/api/sugestoes";

    async save(dados: Sugestao): Promise<string> {

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

    async getAllSugestoes() : Promise<Sugestao[]>{

        try{
          const response = await fetch(`${this.baseUrl}`);

          if (!response.ok) {
            console.error(`Erro na resposta: ${response.status} ${response.statusText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Sugestao[] = await response.json();
          return data;
        }
        catch(error){
          console.error('Erro na requisição:', error);
            throw error;
        }
    }

}

export const useSugestaoService = () => new SugestaoService();