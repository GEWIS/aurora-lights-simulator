import {Card, Table} from "react-bootstrap";
import {useContext} from "react";
import {LightsContext} from "../context/LightsContext";
import LightsSwitchRow from "./LightsSwitchesRow";

export default function LightsSwitchesCard() {
  const { lightsSwitches } = useContext(LightsContext)

  return (
    <Card>
      <Card.Body>
        <Card.Title>Switches</Card.Title>
        <Card.Text>
          <div>
            <Table striped style={{ width: "fit-content" }}>
              <tbody>
              {lightsSwitches.map((lightsSwitch) => (
                <LightsSwitchRow key={lightsSwitch.id} lightsSwitch={lightsSwitch}/>
              ))}
              </tbody>
          </Table>
        </div>
      </Card.Text>
      </Card.Body>
    </Card>
  )
}
