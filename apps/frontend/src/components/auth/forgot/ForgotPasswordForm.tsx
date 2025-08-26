import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { routes } from "@/constants/routes";
import {forgotPassword} from "@/components/auth/forgot/ForgotPasswordForm.funcs.tsx";

type FormData = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>We'll send you a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              label="Email*"
              placeholder="you@example.com"
              type="email"
              error={errors.email}
              {...register("email", { required: true })}
            />
          </div>
          <CardDescription>
            Remembered your password?{" "}
            <Link className="text-primary" to={routes.signIn}>
              Sign in
            </Link>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Send reset link
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
