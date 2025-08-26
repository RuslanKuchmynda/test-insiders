import { apiPost } from "@/services/api";
import { apiRoutes } from "@/constants/routes";

export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}
interface Token {
  accessToken: string;
}

export async function signUp(data: SignUp) {
  return await apiPost<SignUp, Token>(apiRoutes.signUp, data);
}
