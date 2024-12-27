import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {io, Socket} from "socket.io-client";
import {AuthContext} from "./AuthContext.tsx";

export enum SocketConnectionState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
}

function connectToSocket(setLightsSocket: Dispatch<SetStateAction<Socket | null>>, setConnection: Dispatch<SetStateAction<SocketConnectionState>>) {
  const lightsSocket = io('/lights', {
    path: '/socket.io/',
  });

  lightsSocket.on('connect', () => {
    console.info('SocketIO: connected to /lights');
    setLightsSocket(lightsSocket);
    setConnection(SocketConnectionState.CONNECTED);
  });

  lightsSocket.on('disconnect', () => {
    console.info('SocketIO: disconnected /lights');
    setConnection(SocketConnectionState.CONNECTING);
  });
}

interface ISocketContext {
  currentDMXValues: number[];
  connection: SocketConnectionState;
}

const defaultContext: ISocketContext = {
  currentDMXValues: [],
  connection: SocketConnectionState.DISCONNECTED,
};

export const SocketContext = createContext<ISocketContext>(defaultContext);

export default function SocketContextProvider({ children }: PropsWithChildren) {
  const [lightsSocket, setLightsSocket] = useState<Socket | null>(null);
  const [connection, setConnection] = useState<SocketConnectionState>(SocketConnectionState.DISCONNECTED);
  const [dmxValues, setDmxValues] = useState<number[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    setConnection(SocketConnectionState.CONNECTING);
    connectToSocket(setLightsSocket, setConnection);
  }, [user]);

  const onDmxPacket = (data: number[]) => {
    setDmxValues(data);
    console.log(data);
  };

  const onDisconnect = () => {
    setDmxValues([]);
  };

  useEffect(() => {
    if (!lightsSocket) return;

    lightsSocket.on('dmx_packet', onDmxPacket);
    lightsSocket.on('disconnect', onDisconnect);

    return () => {
      lightsSocket.removeListener('dmx_packet', onDmxPacket);
      lightsSocket.removeListener('disconnect', onDisconnect);
    }
  }, [lightsSocket]);

  const context = useMemo((): ISocketContext => ({
    currentDMXValues: dmxValues,
    connection,
  }), [connection]);

  return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}
