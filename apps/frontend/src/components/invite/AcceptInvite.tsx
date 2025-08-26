import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useSearchParams, Link } from "react-router";
import { routes } from "@/constants/routes";
import {acceptInvite} from "@/components/invite/AcceptInvite.funcs.ts";

export default function AcceptInvite() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onAccept = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await acceptInvite(token);
      setAccepted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to accept invite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-80 mx-auto mt-20">
      <CardHeader>
        <CardTitle>Accept Invite</CardTitle>
        <CardDescription>
          {accepted
            ? "You have successfully accepted the invite!"
            : "Click Accept to join."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2">
        {!accepted && (
          <Button
            onClick={onAccept}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Accept"}
          </Button>
        )}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Link
          className="text-primary text-sm text-center mt-2"
          to={routes.signIn}
        >
          Back to sign in
        </Link>
      </CardFooter>
    </Card>
  );
}