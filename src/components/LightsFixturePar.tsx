import {useContext} from "react";
import {ParResponse} from "../api";
import {SocketContext} from "../context/SocketContext";
import './strobe.css';

interface Props {
  par: ParResponse,
}

export default function LightsFixturePar({ par }: Props) {
  const { currentDMXValues } = useContext(SocketContext);

  // DMX channels start at 1, so we need to subtract by 2 to start at 0
  const masterDimValue = currentDMXValues[par.masterDimChannel - 1] ?? 0;
  const dimFactor = masterDimValue / 255;

  const redValue = (currentDMXValues[par.redChannel - 1] ?? 0) * dimFactor;
  const greenValue = (currentDMXValues[par.greenChannel - 1] ?? 0) * dimFactor;
  const blueValue = (currentDMXValues[par.blueChannel - 1] ?? 0) * dimFactor;

  const isStrobing = (currentDMXValues[par.shutterChannel - 1] ?? 0)  === par.shutterChannelValues.strobe;
  const isResetting = par.canReset && par.resetChannel ? (currentDMXValues[par.resetChannel - 1] ?? 0) === par.resetChannelValue : false;

  return (
    <div className="" style={{ width: '2rem', height: '2rem', backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})` }}>
      <div
        className={`w-100 h-100 d-flex justify-content-center align-items-center fw-bold text-white ${isStrobing ? 'strobe' : ''}`}
        style={{ textShadow: '1px 1px 2px black' }}
      >
        {isResetting ? 'R' : 'R'}
      </div>
    </div>
  )
}


