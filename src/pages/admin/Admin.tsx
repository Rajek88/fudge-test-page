import { Button } from "components/Button";
import { Input } from "components/Input";
import { Page } from "components/Page";
import { Select } from "components/Select";
import TableSetup from "components/tableSetup/TableSetup";
import React, { useState } from "react";
import { validateEmail } from "utils/validators/Validators";

type Props = {};

const Admin = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [team, setTeam] = useState<string>("A");
  const [rows, setRows] = useState<object[]>([]);
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

  const inviteUser = () => {
    setRows((p) => [
      ...p,
      {
        "Sr. no": p.length + 1,
        email: email,
        status: "invited",
        time: Date.now(),
      },
    ]);
  };

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
          <Button onClick={() => inviteUser()}>Invite</Button>
        </div>
      </div>
      <div>
        <h2 className="py-2 font-semibold">Invitations sent.</h2>
        <TableSetup
          columns={["Sr. no", "email", "status", "time"]}
          rows={rows}
        />
      </div>
    </Page>
  );
};

export default Admin;
