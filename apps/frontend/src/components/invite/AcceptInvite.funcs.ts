import {apiGet} from "@/services/api";
import { apiRoutes } from "@/constants/routes";

interface AcceptInvite {
  token: string;
}

export async function acceptInvite(token: string | null) {
  return await apiGet<AcceptInvite>(`${apiRoutes.acceptInvite}?token=${token}`);
}
