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

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (_data: FormData) => {
    //temp
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>Create a new password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <Input
              label="New password*"
              type="password"
              placeholder="••••••"
              error={errors.password}
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          <div className="mb-3">
            <Input
              label="Confirm password*"
              type="password"
              placeholder="••••••"
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                required: true,
                validate: (v) => v === password || "Passwords must match",
              })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Reset
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
