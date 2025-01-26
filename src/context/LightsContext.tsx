import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import {
  AuthUser,
  getControllerLightsGroups,
  getControllerLightsSwitches,
  LightsGroupResponse,
  LightsSwitchResponse
} from '../api';
import { AuthContext } from './AuthContext';

interface ILightsContext {
  lightsGroups: LightsGroupResponse[];
  lightsSwitches: LightsSwitchResponse[];
}

const defaultContext: ILightsContext = {
  lightsGroups: [],
  lightsSwitches: [],
};

export const LightsContext = createContext(defaultContext);

export default function LightsContextProvider({ children }: PropsWithChildren) {
  const [lightsGroups, setLightsGroups] = useState<LightsGroupResponse[]>([]);
  const [lightsSwitches, setLightsSwitches] = useState<LightsSwitchResponse[]>([]);

  const authContext = useContext(AuthContext);
  const authUser: AuthUser | null = authContext.user;

  useEffect(() => {
    if (authUser && authUser.lightsControllerId !== undefined) {
      getControllerLightsGroups({ path: { id: authUser.lightsControllerId } }).then((res) => {
        if (res.response.ok && res.data) {
          setLightsGroups(res.data);
        }
      });
      getControllerLightsSwitches({ path: { id: authUser.lightsControllerId } }).then((res) => {
        if (res.response.ok && res.data) {
          setLightsSwitches(res.data);
        }
      });
    }
  }, [authUser]);

  const context = useMemo(
    (): ILightsContext => ({
      lightsGroups,
      lightsSwitches,
    }),
    [lightsGroups, lightsSwitches],
  );

  return <LightsContext.Provider value={context}>{children}</LightsContext.Provider>;
}
