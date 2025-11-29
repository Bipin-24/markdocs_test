import * as schema from './schema';
import * as functions from './functions';
import { Document } from '../components/Document';
import { Ascii } from '../components/Ascii';
import { Callout } from '../components/Callout';
import { Code } from '../components/Code';
import { Heading } from '../components/Heading';
import { ApiLayout, ApiSection, ApiDescription, ApiCode, ApiEndpoint, ApiParameters, ApiParameter } from '../components/ApiLayout';
import { Feedback } from '../components/Feedback';
import { QuickStart } from '../components/QuickStart';
import { ApiTryIt } from '../components/ApiTryIt';

export const config = {
  ...schema,
  functions,
  components: {
    Document,
    Ascii,
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
    Feedback,
    QuickStart,
    ApiTryIt,
  }
};
