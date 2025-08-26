import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function Search() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Search trips..." className="w-56" />
      <Button>Search</Button>
    </div>
  );
}
