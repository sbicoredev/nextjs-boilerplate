import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

type Props = {
  alt?: string | null;
  className?: string;
  src?: string | null;
};

export const UserAvatar = ({ src, alt, className }: Props) => (
  <Avatar className={cn("size-8 rounded-lg", className)}>
    <AvatarImage alt={alt || undefined} src={src || undefined} />
    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
  </Avatar>
);
