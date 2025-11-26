import * as schema from './schema';
import * as functions from './functions';
import { Document } from '../components/Document';
import { Callout } from '../components/Callout';
import { Code } from '../components/Code';
import { Heading } from '../components/Heading';
import { ApiLayout, ApiSection, ApiDescription, ApiCode, ApiEndpoint, ApiParameters, ApiParameter } from '../components/ApiLayout';

export const config = {
  ...schema,
  functions,
  components: {
    Document,
    Callout,
    Code,
    Heading,
    ApiLayout,
    ApiSection,
    ApiDescription,
    ApiCode,
    ApiEndpoint,
    ApiParameters,
    ApiParameter,
  }
};
