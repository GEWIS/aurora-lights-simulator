import { useContext } from 'react';
import { hexToCSSFilter } from 'hex-to-css-filter';
import { MovingHeadWheelResponse } from '../../api';
import { SocketContext } from '../../context/SocketContext';
import LightsFixtureMovingHead from './LightsFixtureMovingHead';

interface Props {
  movingHead: MovingHeadWheelResponse;
  firstChannel: number;
}

const Colors = {
  white: '#cccccc',
  orange: '#f18900',
  red: '#ff0000',
  yellow: '#fff225',
  green: '#169300',
  blue: '#003a91',
  rosered: '#c91651',
  lightblue: '#98e7ff',
};

export default function LightsFixtureMovingHeadWheel({ movingHead, firstChannel }: Props) {
  const { currentDMXValues } = useContext(SocketContext);

  const masterDimValue = currentDMXValues[movingHead.masterDimChannel - 1] ?? 0;
  const dimFactor = masterDimValue / 255;

  const colorValue = currentDMXValues[movingHead.colorWheelChannel - 1];
  const colorName = movingHead.colorChannelValues.find((c) => c.channelValue === colorValue);
  const hex = colorName ? Colors[colorName?.color] : undefined;
  const cssFilterResult = hexToCSSFilter(hex ?? '#000000');

  const redValue = cssFilterResult.rgb[0] * dimFactor;
  const greenValue = cssFilterResult.rgb[1] * dimFactor;
  const blueValue = cssFilterResult.rgb[2] * dimFactor;

  return (
    <LightsFixtureMovingHead
      movingHead={movingHead}
      redValue={redValue}
      greenValue={greenValue}
      blueValue={blueValue}
    />
  );
}
