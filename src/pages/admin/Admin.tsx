import { Button } from "components/Button";
import { Input } from "components/Input";
import { Page } from "components/Page";
import { Select } from "components/Select";
import React, { useState } from "react";
import { validateEmail } from "utils/validators/Validators";

type Props = {};

const Admin = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [team, setTeam] = useState<string>("A");
  const teams = ["A", "B", "C", "D"];
  const [err, setErr] = useState<boolean>(false);

  const handleTeamChange = (e: string) => {
    const team = e;
    setTeam(team);
  };

  const handleEmailChange = (e: string) => {
    const mailId = e;
    const isMailvalid = validateEmail(mailId);
    if (!isMailvalid) {
      setErr(true);
    } else {
      setErr(false);
    }
    setEmail(mailId);
  };

  const inviteUser = () => {};

  return (
    <Page
      title="Admin Page"
      className="[&>div]:py-8 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0 divide-y"
    >
      <div>
        <h2 className="py-2 font-semibold">Select team.</h2>
        <Select value={team} onChange={handleTeamChange} options={teams} />
        <h2 className="py-2 font-semibold">
          Enter the email Id of the user you want to invite.
        </h2>
        <Input
          value={email}
          onChange={handleEmailChange}
          error={err ? "Email should be valid" : ""}
        />
      </div>
      <div>
        <div className="flex justify-between items-center">
          <Button
            onClick={() =>
              alert(
                JSON.stringify({
                  team,
                  email,
                })
              )
            }
          >
            Invite
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default Admin;
