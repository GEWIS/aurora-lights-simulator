import { useContext } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext.tsx';
import { LightsContext } from '../context/LightsContext.tsx';
import {SocketConnectionState, SocketContext} from "../context/SocketContext.tsx";

export default function ControllerDetails() {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const lightsGroupsContext = useContext(LightsContext);

  if (authContext.loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (authContext.user == null) {
    return (
      <div>
        <p className="fst-italic">No valid API key given. Unauthenticated.</p>
      </div>
    );
  }

  const getLightsGroups = () => {
    return lightsGroupsContext.lightsGroups.map((g) => (
      <p key={g.id}>
        {g.name}: ({g.pars.length} pars, {g.movingHeadRgbs.length} MHs RGB, {g.movingHeadWheels.length} MHs Wheel)
      </p>
    ));
  };

  const getSocketConnection = () => {
    switch (socketContext.connection) {
      case SocketConnectionState.CONNECTED: return (<span className="text-success fw-bold">CONNECTED</span>);
      case SocketConnectionState.DISCONNECTED: return (<span className="text-danger">Disconnected</span>);
      case SocketConnectionState.CONNECTING: return (<span className="text-warning">Connecting...</span>);
    }
  }

  return (
    <div>
      <Table striped>
        <tbody>
          <tr className="me-1">
            <td>Controller Name</td>
            <td>{authContext.user.name}</td>
          </tr>
          <tr>
            <td>Controller ID</td>
            <td>{authContext.user.lightsControllerId}</td>
          </tr>
          <tr>
            <td>SocketIO</td>
            <td>{getSocketConnection()}</td>
          </tr>
          <tr>
            <td>Lights groups</td>
            <td>{getLightsGroups()}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
