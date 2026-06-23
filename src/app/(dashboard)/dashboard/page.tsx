import { Container } from "~/components/container";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { StatsCard } from "./stats-card";
import { TotalVisitorChart } from "./total-visitor";

export default function DashboardPage() {
  return (
    <Container>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="font-bold text-3xl tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button>Download</Button>
              </div>
            </div>
            <Tabs className="flex-col space-y-4" defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger disabled value="analytics">
                  Analytics
                </TabsTrigger>
                <TabsTrigger disabled value="reports">
                  Reports
                </TabsTrigger>
                <TabsTrigger disabled value="notifications">
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-4" value="overview">
                <StatsCard />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <div className="col-span-4">
                    <Overview />
                  </div>
                  <div className="col-span-3">
                    <RecentSales />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div>
              <TotalVisitorChart />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
