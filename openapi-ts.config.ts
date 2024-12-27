import { defaultPlugins } from '@hey-api/openapi-ts';

export default {
  client: '@hey-api/client-fetch',
  input: '../aurora-core/build/swagger.json',
  output: `./src/api/`,
  plugins: [
    ...defaultPlugins,
    {
      enums: 'typescript',
    },
  ],
};
