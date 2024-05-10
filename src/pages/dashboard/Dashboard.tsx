import { Page } from "components/Page";
import { USE_BASE_SOCKET_URL, USE_BASE_URL } from "config/URL";
import { useProfile } from "context/profile.context";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { profile } = useProfile();
  const connection = useRef<WebSocket | null>(null);
  const [activeUsers, setActiveUsers] = useState<object>({});
  const [teamMembers, setTeamMembers] = useState<object>({});

  async function connectSocketToServer() {
    const ws = new WebSocket(
      `${USE_BASE_SOCKET_URL}/websocket?user_id=${profile.user.id}`
    );
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (ws.readyState === 1) {
          clearInterval(timer);
          resolve(ws);
        }
      }, 10);
    });
  }

  const logout = () => {
    localStorage.removeItem("user");
    return window.location.reload();
  };

  useEffect(() => {
    // fetch list of users belonging to team where current logged in user is member of
    async function socketer() {
      const ws = (await connectSocketToServer()) as WebSocket;

      // setup listener
      ws.onmessage = (webSocketMessage) => {
        const messageBody: string = webSocketMessage.data;
        if (messageBody.startsWith("live-user-ids")) {
          // get the string of response
          const liveUsersObj = messageBody?.split("live-user-ids ")[1];
          // split it to get the object, and parse the object to get hashmap
          const liveUsersMap = JSON.parse(liveUsersObj);
          // set it to state
          setActiveUsers(liveUsersMap);
        }
      };

      connection.current = ws;

      // setInterval to make calls to socket every x seconds and get the list of active users
      setInterval(() => {
        ws.send("live-user-ids");
      }, 3000);
    }
    // function to fetch data from BE
    async function fetchData() {
      const res = await fetch(`${USE_BASE_URL}/user/getTeamMembers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
      });

      if (!res.ok) {
        throw new Error();
      }

      // we are here means req is ok
      const data = await res.json();
      // now get the list of teamMembers
      const teamMembersList = data?.teamMembers;
      setTeamMembers(teamMembersList);
    }

    try {
      // check for session storage to get must Redirect
      const shouldRedirect = sessionStorage.getItem("mustRedirectTo");
      if (shouldRedirect) {
        // first delete the key, to avoid loop and repeated call
        sessionStorage.removeItem("mustRedirectTo");
        // now move to that page
        window.location.href = shouldRedirect;
        return;
      }
      socketer();
      fetchData();
    } catch (error) {}

    return () => {
      // if anytime connection exists, close it
      if (connection.current) {
        connection.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      title={`Hi ${profile?.user?.name}`}
      className="[&>div]:py-4 [&>div:first-child]:pt-0 [&>div:last-child]:pb-0 divide-y"
    >
      <button
        className="w-full text-end text-red-700 font-bold"
        onClick={logout}
      >
        Logout
      </button>
      <div className="font-bold text-lg">All Teams</div>
      {/* loop over the team wise list of users */}
      {Object.keys(teamMembers).map((key: string, index: number) => (
        <div key={index} className="">
          <h3 className="font-bold">
            Team {key}: ({teamMembers[`${key}`]?.length} members)
          </h3>
          {/* loop over list of members */}
          {teamMembers[`${key}`]?.map((member: any, ind: number) => {
            // render the member only if he/she is online
            return (
              <div
                key={ind}
                className="p-2 border-2 border-gray-300 mb-3 rounded-md"
              >
                <h3 className="font-bold text-gray-700">
                  {member?.user.name} (id: {member.user.id}) -&gt;{" "}
                  {activeUsers[`${member.user.id}`] ? (
                    <span className="text-green-700">Online</span>
                  ) : (
                    <span className="text-gray-400">Offline</span>
                  )}
                </h3>
                <p>{member.user.email}</p>
              </div>
            );
          })}
        </div>
      ))}
    </Page>
  );
};

export default Dashboard;
