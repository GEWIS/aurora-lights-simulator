import { Card } from 'react-bootstrap';
import { LightsGroupResponse } from '../api';
import LightsFixturePar from './fixtures/LightsFixturePar';
import LightsFixtureMovingHeadRgb from './fixtures/LightsFixtureMovingHeadRgb';
import LightsFixtureMovingHeadWheel from './fixtures/LightsFixtureMovingHeadWheel';

interface Props {
  lightsGroup: LightsGroupResponse;
}

export default function LightsGroupCard({ lightsGroup }: Props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{lightsGroup.name}</Card.Title>
        <Card.Body>
          <div className="d-flex flex-row gap-5">
            {lightsGroup.pars.map((p) => (
              <LightsFixturePar key={p.id} par={p.fixture} />
            ))}
          </div>
          <div className="d-flex flex-row gap-5">
            {lightsGroup.movingHeadRgbs.map((p) => (
              <LightsFixtureMovingHeadRgb key={p.id} movingHead={p.fixture} />
            ))}
          </div>
          <div className="d-flex flex-row gap-5">
            {lightsGroup.movingHeadWheels.map((p) => (
              <LightsFixtureMovingHeadWheel key={p.id} movingHead={p.fixture} />
            ))}
          </div>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
