import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { ApiKeyParameters, authKey, AuthUser } from '../api';

interface IAuthContext {
  user: AuthUser | null;
  loading: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  authenticate: () => void;
}

const defaultContext: IAuthContext = {
  user: null,
  loading: false,
  apiKey: '',
  setApiKey: () => {},
  authenticate: () => {},
};

export const AuthContext = createContext(defaultContext);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');

  const authenticate = useCallback(async () => {
    setLoading(true);
    if (apiKey != '') {
      const body: ApiKeyParameters = { key: apiKey };
      const auth = await authKey({ body });
      if (auth.response.ok && auth.data) {
        setUser(auth.data);
      }
    }
    setLoading(false);
  }, [apiKey]);

  const context = useMemo(
    (): IAuthContext => ({
      user,
      loading,
      apiKey,
      setApiKey,
      authenticate,
    }),
    [user, loading, apiKey, authenticate],
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}
