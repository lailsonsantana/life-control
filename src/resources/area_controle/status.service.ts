import { StatusArea } from "@/types/StatusArea";

export async function mudarStatus(
  id: number,
  status: StatusArea
) {
  const response = await api.put("/mudar-status", {
    id,
    status
  });

  return response.data as { status: string };
}