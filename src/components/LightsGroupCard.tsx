import { Card } from 'react-bootstrap';
import { CSSProperties } from 'react';
import { LightsGroupResponse } from '../api';
import LightsFixturePar from './fixtures/LightsFixturePar';
import LightsFixtureMovingHeadRgb from './fixtures/LightsFixtureMovingHeadRgb';
import LightsFixtureMovingHeadWheel from './fixtures/LightsFixtureMovingHeadWheel';
import LightsGroupCardFixture from './LightsGroupCardFixture';

interface Props {
  lightsGroup: LightsGroupResponse;
}

export default function LightsGroupCard({ lightsGroup }: Props) {
  const { gridSizeX } = lightsGroup;
  const isGrid = lightsGroup.gridSizeY > 0;
  const gridSizeY = isGrid ? lightsGroup.gridSizeY : 1;
  const groupHasMovingHeads = lightsGroup.movingHeadWheels.length > 0 || lightsGroup.movingHeadRgbs.length > 0;

  const boxSize: CSSProperties = groupHasMovingHeads
    ? { width: `${gridSizeX * 5}rem`, height: `${gridSizeY * 9}rem` }
    : { width: `${gridSizeX * 3}rem`, height: `${gridSizeY * 3}rem` };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{lightsGroup.name}</Card.Title>
        <Card.Body className="mx-4 mb-4">
          <div className="position-relative" style={boxSize}>
            {lightsGroup.pars.map((p) => (
              <LightsGroupCardFixture key={p.id} fixture={p} lightsGroup={lightsGroup}>
                <LightsFixturePar par={p.fixture} />
              </LightsGroupCardFixture>
            ))}
            {lightsGroup.movingHeadRgbs.map((p) => (
              <LightsGroupCardFixture key={p.id} fixture={p} lightsGroup={lightsGroup}>
                <LightsFixtureMovingHeadRgb key={p.id} movingHead={p.fixture} />
              </LightsGroupCardFixture>
            ))}
            {lightsGroup.movingHeadWheels.map((p) => (
              <LightsGroupCardFixture key={p.id} fixture={p} lightsGroup={lightsGroup}>
                <LightsFixtureMovingHeadWheel key={p.id} movingHead={p.fixture} />
              </LightsGroupCardFixture>
            ))}
          </div>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
