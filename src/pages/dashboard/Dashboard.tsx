import { Page } from "components/Page";
import { useProfile } from "context/profile.context";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { profile } = useProfile();
  return (
    <Page
      title={`Hi ${profile?.user?.name}`}
      className="[&>div]:py-8 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0 divide-y"
    >
      <div>All Teams</div>
    </Page>
  );
};

export default Dashboard;
