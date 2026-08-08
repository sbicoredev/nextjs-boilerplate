import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

type Props = {
  alt?: string | null;
  className?: string;
  src?: string | null;
};

export const UserAvatar = ({ src, alt, className }: Props) => (
  <Avatar className={cn("overflow-hidden", className)}>
    <AvatarImage alt={alt || "user"} src={src || "/assets/user-1.jpg"} />
    <AvatarFallback className="uppercase">{alt?.charAt(0)}</AvatarFallback>
  </Avatar>
);
