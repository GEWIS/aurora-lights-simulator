import { useContext } from 'react';
import { hexToCSSFilter } from 'hex-to-css-filter';
import { MovingHeadRgbResponse, MovingHeadWheelResponse } from '../../api';
import { SocketContext } from '../../context/SocketContext';
import beam from './beam.svg';
import circle from './circle.svg';

interface Props {
  movingHead: MovingHeadRgbResponse | MovingHeadWheelResponse;
  redValue: number;
  greenValue: number;
  blueValue: number;
}

function componentToHex(c: number): string {
  const cInt = Math.round(c);
  return cInt.toString(16).padStart(2, '0');
}

export default function LightsFixtureMovingHead({ movingHead, redValue, greenValue, blueValue }: Props) {
  const { currentDMXValues } = useContext(SocketContext);

  const hex = `#${componentToHex(redValue)}${componentToHex(greenValue)}${componentToHex(blueValue)}`;
  const cssFilterResult = hexToCSSFilter(hex);
  const cssFilter = cssFilterResult.filter.substring(0, cssFilterResult.filter.length - 1);

  const panValue = currentDMXValues[movingHead.panChannel - 1] ?? 0;
  const finePanValue = movingHead.finePanChannel ? (currentDMXValues[movingHead.finePanChannel - 1] ?? 0) : 0;
  const tiltValue = currentDMXValues[movingHead.tiltChannel - 1] ?? 0;
  const fineTiltValue = movingHead.fineTiltChannel ? (currentDMXValues[movingHead.fineTiltChannel - 1] ?? 0) : 0;

  const panAngle = 90 + ((panValue + finePanValue / 255) / 255) * 1.5 * 360;
  const tiltAngle = ((tiltValue + fineTiltValue / 255) / 255) * 180;

  return (
    <div className="border-danger border-2 position-relative" style={{ width: '8rem', height: '8rem' }}>
      <div
        className="position-relative top-0 left-0 w-100 h-100"
        style={{ transform: `rotate(${panAngle}deg) rotateY(${tiltAngle}deg)` }}
      >
        <img
          alt=""
          src={beam}
          className="position-relative"
          style={{
            height: '3rem',
            width: '3rem',
            top: '2.5rem',
            left: '1rem',
            transform: 'rotate(90deg)',
            filter: cssFilter,
          }}
        />
      </div>
      <div className="position-absolute top-0 left-0 w-100 h-100">
        <img
          alt=""
          src={circle}
          className="position-relative"
          style={{ height: '1.5rem', width: '1.5rem', top: '3.1rem', left: '3.25rem', filter: cssFilter }}
        />
      </div>
    </div>
  );
}
