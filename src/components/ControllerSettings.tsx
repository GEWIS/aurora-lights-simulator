import { useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext.tsx';
import LoadingButton from './LoadingButton.tsx';

export default function ControllerSettings() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Controller API Key"
            aria-label="Controller API Key"
            aria-describedby="controller-api-key-submit"
            name="api-key"
            value={authContext.apiKey}
            onChange={(e) => authContext.setApiKey(e.target.value)}
          />
          <LoadingButton
            loading={authContext.loading}
            variant="primary"
            id="controller-api-key-submit"
            onClick={authContext.authenticate}
          >
            Save
          </LoadingButton>
        </InputGroup>
      </Form>
    </div>
  );
}
