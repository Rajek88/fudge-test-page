import { USE_BASE_URL } from "config/URL";
import { useProfile } from "context/profile.context";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const Invitations = (props: Props) => {
  const { id: invitation_id } = useParams();
  const { profile, isLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${USE_BASE_URL}/user/acceptInvitation?id=${invitation_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${profile.token}`,
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        alert(`${data?.message}`);
      }
      setTimeout(() => {
        return navigate("/dashboard");
      }, 3000);
    };
    // make sure code only runs when profile is loaded
    if (!isLoading) {
      if (profile?.token) {
        fetchData();
      } else {
        // set the link to sessionStorage as mustRedirectTo
        sessionStorage.setItem("mustRedirectTo", window.location.href);
        navigate("/login");
      }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <h2 className="p-8 m-8 font-bold">
      {invitation_id ? `Processing your invitation...` : "Invalid invitation"}
    </h2>
  );
};

export default Invitations;
