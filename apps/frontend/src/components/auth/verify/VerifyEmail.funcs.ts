import {apiGet} from "@/services/api";
import { apiRoutes } from "@/constants/routes";

interface VerifyEmail {
  token: string;
}

export async function verifyEmail(token: string | null) {
  return await apiGet<VerifyEmail>(`${apiRoutes.verifyEmail}?token=${token}`);
}
