import { useContext } from 'react';
import { MovingHeadRgbResponse } from '../../api';
import { SocketContext } from '../../context/SocketContext';
import LightsFixtureMovingHead from './LightsFixtureMovingHead';

interface Props {
  movingHead: MovingHeadRgbResponse;
}

export default function LightsFixtureMovingHeadRgb({ movingHead }: Props) {
  const { currentDMXValues } = useContext(SocketContext);

  const masterDimValue = currentDMXValues[movingHead.masterDimChannel - 1] ?? 0;
  const dimFactor = masterDimValue / 255;

  const redValue = (currentDMXValues[movingHead.redChannel - 1] ?? 0) * dimFactor;
  const greenValue = (currentDMXValues[movingHead.greenChannel - 1] ?? 0) * dimFactor;
  const blueValue = (currentDMXValues[movingHead.blueChannel - 1] ?? 0) * dimFactor;

  return (
    <LightsFixtureMovingHead
      movingHead={movingHead}
      redValue={redValue}
      greenValue={greenValue}
      blueValue={blueValue}
    />
  );
}
