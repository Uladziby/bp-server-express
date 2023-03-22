import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/init/types.graphql',
  generates: {
    'src/graphql/types/server.ts': {
      plugins: [
        '@graphql-codegen/typescript',
        '@graphql-codegen/typescript-resolvers',
      ],
    },
  },
};

export default config;
