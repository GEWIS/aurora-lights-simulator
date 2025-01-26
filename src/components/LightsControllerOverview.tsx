import { useContext } from 'react';
import { LightsContext } from '../context/LightsContext';
import LightsGroupCard from './LightsGroupCard';
import LightsSwitchesCard from "./LightsSwitchesCard";

export default function LightsControllerOverview() {
  const lightsGroupsContext = useContext(LightsContext);

  return (
    <>
      {lightsGroupsContext.lightsSwitches.length > 0 && (<LightsSwitchesCard />)}
      {lightsGroupsContext.lightsGroups.map((lightsGroup) => (
        <LightsGroupCard key={lightsGroup.id} lightsGroup={lightsGroup} />
      ))}
    </>
  );
}
