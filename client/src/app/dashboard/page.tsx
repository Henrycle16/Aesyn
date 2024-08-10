import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Unstable_Grid2";

import { config } from "@/utils/dashboard/config";
import { Budget } from "@/app/dashboard/_components/overview/budget";
import { Sales } from "@/app/dashboard/_components/overview/sales";
import { TasksProgress } from "@/app/dashboard/_components/overview/tasks-progress";
import { TotalCustomers } from "@/app/dashboard/_components/overview/total-customers";
import { TotalProfit } from "@/app/dashboard/_components/overview/total-profit";
import { Traffic } from "@/app/dashboard/_components/overview/traffic";

export const metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: "100%" }} value={75.5} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: "100%" }} value="$24k" />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCustomers
          diff={16}
          trend="down"
          sx={{ height: "100%" }}
          value="1.6k"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: "100%" }} value="$15k" />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={[63, 15, 22]}
          labels={["Desktop", "Tablet", "Phone"]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            {
              name: "This year",
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
            },
            {
              name: "Last year",
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
