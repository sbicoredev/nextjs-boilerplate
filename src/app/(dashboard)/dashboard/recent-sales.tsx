import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="Avatar" src="/assets/avatar.jpg" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="font-medium text-sm leading-none">Olivia Martin</p>
              <p className="text-muted-foreground text-sm">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage alt="Avatar" src="/assets/avatar.jpg" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="font-medium text-sm leading-none">Jackson Lee</p>
              <p className="text-muted-foreground text-sm">
                jackson.lee@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="Avatar" src="/assets/avatar.jpg" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="font-medium text-sm leading-none">
                Isabella Nguyen
              </p>
              <p className="text-muted-foreground text-sm">
                isabella.nguyen@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$299.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="Avatar" src="/assets/avatar.jpg" />
              <AvatarFallback>WK</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="font-medium text-sm leading-none">William Kim</p>
              <p className="text-muted-foreground text-sm">will@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$99.00</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="Avatar" src="/assets/avatar.jpg" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="font-medium text-sm leading-none">Sofia Davis</p>
              <p className="text-muted-foreground text-sm">
                sofia.davis@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
