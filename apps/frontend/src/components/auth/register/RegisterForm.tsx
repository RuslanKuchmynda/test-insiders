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
import {Link, useNavigate} from "react-router";
import { routes } from "@/constants/routes";
import {signUp, type SignUp} from "@/components/auth/register/RegisterForm.funcs.ts";
import {useAuthStore} from "@/store/auth-store.ts";

export default function RegisterForm() {

  const { setAccessToken } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>();

  const onSubmit = async (data: SignUp) => {
    try {
      const response = await signUp(data);
      setAccessToken(response.accessToken);
      navigate(routes.trips);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Input
              label="First name*"
              placeholder="John"
              error={errors.firstName}
              {...register("firstName", {required: true})}
            />
            <Input
              label="Last name*"
              placeholder="Doe"
              error={errors.lastName}
              {...register("lastName", {required: true})}
            />
            <Input
              label="Email*"
              placeholder="john@example.com"
              type="email"
              error={errors.email}
              {...register("email", {required: true})}
            />
            <Input
              label="Password*"
              placeholder="Password"
              type="password"
              error={errors.password}
              {...register("password", {required: true, minLength: 6})}
            />
            <Input
              label="Repeat Password*"
              placeholder="Repeat Password"
              type="password"
              error={errors.repeatPassword}
              {...register("repeatPassword", {required: true, minLength: 6})}
            />
          <CardDescription>
            Already have an account?{" "}
            <Link className="text-primary" to={routes.signIn}>
              Sign in
            </Link>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
