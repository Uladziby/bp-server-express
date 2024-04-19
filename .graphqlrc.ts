import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql/',
  documents: ['src/graphql/*.graphql', 'src/{bus, ui, app}/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        defaultScalarType: 'unknown',
        skipTypename: true,
        documentMode: 'string',
      },
    },
  },
};

export default config;
