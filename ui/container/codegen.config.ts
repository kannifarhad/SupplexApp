import type { CodegenConfig } from '@graphql-codegen/cli';
// import { SUPPLEX_API_URL } from './src/constants';

const config: CodegenConfig = {
   // schema: `${SUPPLEX_API_URL}/graphql`,
   schema: `http://localhost:4000/graphql`,
   documents: ['src/**/!(*.generated).{ts,tsx}'],
   overwrite: true,
   generates: {
      'src/types/graphql.generated.ts': {
         plugins: ['typescript', 'typescript-operations'],
         config: {
            // avoidOptionals: false,
            // skipDocumentsValidation: false,
            // flattenGeneratedTypes: false,
            // withHooks: true,
            // withComponent: false,
            // withHOC: false,
            // withMutationFn: false,
            // schemaDescription: false,
            // descriptions: false,
            // commentDescriptions: false,
            // reactApolloVersion: 3,
            // dedupeFragments:true,
            // inlineFragmentTypes: 'combine',
            fragmentMasking: true,
            excludes: "./node_modules/**",
            skipTypename: true,
            namingConvention:{
               enumValues:"keep"
            }
         }
      },
      // 'src/': {
      //    preset: 'near-operation-file',
      //    presetConfig: {
      //      extension: '.generated.tsx',
      //      folder: '__generated__',
      //      baseTypesPath: './types',
      //    },
      //    plugins: [
      //       'typescript-operations', 
      //       'typescript-react-apollo'
      //    ],
      //  },
    },
}
export default config