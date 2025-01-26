import {useContext} from "react";
import {LightsSwitchResponse} from "../api";
import {SocketContext} from "../context/SocketContext.tsx";

interface Props {
  lightsSwitch: LightsSwitchResponse;
}

export default function LightsSwitchRow({ lightsSwitch }: Props) {
  const { currentDMXValues } = useContext(SocketContext);

  const index = lightsSwitch.dmxChannel - 1;
  const enabled = (currentDMXValues[index] & lightsSwitch.onValue) == lightsSwitch.onValue;

  const status = () => {
    if (enabled) {
      return (
        <span className="fw-bold text-success">ON</span>
      );
    }
    return (<span className="text-danger">OFF</span>)
  }

  return (
    <tr className="me-1">
      <td className="pe-3">{lightsSwitch.name}</td>
      <td>{status()}</td>
    </tr>
  )
}
