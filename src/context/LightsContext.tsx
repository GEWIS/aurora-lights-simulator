import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { AuthUser, getControllerLightsGroups, LightsGroupResponse } from '../api';
import { AuthContext } from './AuthContext';

interface ILightsContext {
  lightsGroups: LightsGroupResponse[];
}

const defaultContext: ILightsContext = {
  lightsGroups: [],
};

export const LightsContext = createContext(defaultContext);

export default function LightsContextProvider({ children }: PropsWithChildren) {
  const [lightsGroups, setLightsGroups] = useState<LightsGroupResponse[]>([]);

  const authContext = useContext(AuthContext);
  const authUser: AuthUser | null = authContext.user;

  useEffect(() => {
    if (authUser && authUser.lightsControllerId !== undefined) {
      getControllerLightsGroups({ path: { id: authUser.lightsControllerId } }).then((res) => {
        if (res.response.ok && res.data) {
          setLightsGroups(res.data);
        }
      });
    }
  }, [authUser]);

  const context = useMemo(
    (): ILightsContext => ({
      lightsGroups,
    }),
    [lightsGroups],
  );

  return <LightsContext.Provider value={context}>{children}</LightsContext.Provider>;
}
