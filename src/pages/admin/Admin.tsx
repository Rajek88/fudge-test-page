import { Button } from "components/Button";
import { Input } from "components/Input";
import { Page } from "components/Page";
import { Select } from "components/Select";
import TableSetup from "components/tableSetup/TableSetup";
import { USE_BASE_URL } from "config/URL";
import React, { useEffect, useState } from "react";
import { validateEmail } from "utils/validators/Validators";

type Props = {};

const Admin = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [team, setTeam] = useState<string>("A");
  const [rows, setRows] = useState<object[]>([]);
  const [update, setUpdate] = useState<number>(0);
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

  const inviteUser = async () => {
    if (!email || !team) {
      setErr(true);
    }
    try {
      const res = await fetch(`${USE_BASE_URL}/admin/inviteUser`, {
        method: "POST",
        body: JSON.stringify({
          email,
          team,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }
      // update counter, to trigger page refresh
      setUpdate((v) => v + 1);
      // reset email field
      setEmail("");
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${USE_BASE_URL}/admin/getAllInvitations`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error();
      }

      // we are here means req is ok
      const data = await res.json();
      // now get the list of teamMembers
      const invitations = data?.invitations;
      // now loop over invitations and generate renderable data
      let rowsToRender = [];
      let count = 1;
      for (let i of invitations) {
        let r = {
          "Sr. no": count,
          email: i.email,
          status: i.status,
          team: i.team,
          joinedTeams: i.joinedTeams?.join(","),
          time: i.updated_at,
        };
        count++;
        rowsToRender.push(r);
      }
      // now set the rows
      setRows(rowsToRender);
      console.log({ rowsToRender });
    }

    fetchData();

    return () => {};
  }, [update]);

  return (
    <Page
      title="Admin Page"
      className="[&>div]:py-8 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0"
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
          columns={["Sr. no", "email", "team", "status", "time", "joinedTeams"]}
          rows={rows}
        />
      </div>
    </Page>
  );
};

export default Admin;
