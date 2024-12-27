import {useContext} from "react";
import {LightsContext} from "../context/LightsContext";
import LightsGroupCard from "./LightsGroupCard";

export default function LightsControllerOverview() {
  const lightsGroupsContext = useContext(LightsContext);

  return (
    <>
      {lightsGroupsContext.lightsGroups.map((lightsGroup) => (<LightsGroupCard key={lightsGroup.id} lightsGroup={lightsGroup} />))}
    </>
  )
}
