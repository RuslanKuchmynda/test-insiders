import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import ShareTripModal from "@/components/modal/ShareTripModal.tsx";

type TripCardProps = {
  id: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  onOpen?: () => void;
  isOwner?: boolean;
};

export default function TripCard({
  id,
  title,
  description,
  startDate,
  endDate,
  imageUrl,
  isOwner,
}: TripCardProps) {
  return (
    <Card className="overflow-hidden w-full max-w-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {imageUrl ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/60 grid place-items-center">
            <span className="px-2 py-1 rounded-md bg-background/70 text-foreground text-xs">
              No image
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <CardHeader className="gap-1.5">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs">
          {startDate && endDate && (
            <span>
              {startDate} - {endDate}
            </span>
          )}
        </CardDescription>
        {description && (
          <CardDescription className="line-clamp-1 text-xs">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="justify-end">
        <div className="flex items-center gap-2">
          {isOwner && <ShareTripModal tripId={id} />}
          <Link to={`/trips/${id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
