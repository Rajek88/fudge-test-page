import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface Profile {
  user: any | null;
  token: string | null;
}

interface ProfileContextProps {
  isLoading: boolean;
  profile: Profile | null;
}

const ProfileContext = createContext<ProfileContextProps>({
  isLoading: true,
  profile: null,
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // console.log("Initing the system");
    try {
      const data = JSON.parse(window.localStorage.getItem("user") || "");
      const token = data?.token;
      const user = data?.user;
      if (user && token) {
        setProfile({ user, token });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
    return () => {
      // Cleanup function if needed
    };
  }, []);

  const isLoading = useMemo(() => ({ isLoading: loading }), [loading]);
  const profile = useMemo(() => ({ profile: userProfile }), [userProfile]);

  // console.log({ isLoading, profile });

  return (
    <ProfileContext.Provider value={{ ...isLoading, ...profile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
