import { PropsWithChildren } from 'react';
import {
  FixtureInGroupResponse_MovingHeadRgbResponse_,
  FixtureInGroupResponse_MovingHeadWheelResponse_,
  FixtureInGroupResponse_ParResponse_,
  LightsGroupResponse,
} from '../api';

interface Props extends PropsWithChildren {
  fixture:
    | FixtureInGroupResponse_ParResponse_
    | FixtureInGroupResponse_MovingHeadRgbResponse_
    | FixtureInGroupResponse_MovingHeadWheelResponse_;
  lightsGroup: LightsGroupResponse;
}

export default function LightsGroupCardFixture({ fixture, lightsGroup, children }: Props) {
  const { gridSizeX } = lightsGroup;
  const isGrid = lightsGroup.gridSizeY > 0;
  const gridSizeY = isGrid ? lightsGroup.gridSizeY : 1;

  const left = `${(fixture.positionX / (gridSizeX - 1)) * 100}%`;
  const top = isGrid ? `${(fixture.positionY / (gridSizeY - 1)) * 100}%` : undefined;

  return (
    <div className="position-absolute" style={{ left, top, transform: 'translateX(-50%)' }}>
      {children}
    </div>
  );
}
