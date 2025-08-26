import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Link, useSearchParams} from "react-router";
import { routes } from "@/constants/routes";
import { useState } from "react";
import {verifyEmail} from "@/components/auth/verify/VerifyEmail.funcs.ts";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [accepted, setAccepted] = useState(false);

  const onSubmit = async () => {
    try {
      await verifyEmail(token);
      setAccepted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          {accepted
            ? "Your email has been verified!"
            : "Click accept to verify your email."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2">
        {!accepted && (
          <Button onClick={onSubmit} className="w-full">
            Accept
          </Button>
        )}

        <Link className="text-primary text-sm text-center" to={routes.signIn}>
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}