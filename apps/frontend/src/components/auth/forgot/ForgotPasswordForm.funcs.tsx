import {apiPost} from "@/services/api";
import { apiRoutes } from "@/constants/routes";

interface ForgotPasswordForm{
  email: string;
}

export async function forgotPassword(email: ForgotPasswordForm ) {
  return await apiPost<ForgotPasswordForm, Response>(apiRoutes.forgotPassword, email);
}
