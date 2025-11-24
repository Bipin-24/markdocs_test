import * as schema from './schema';
import * as functions from './functions';
import { Document } from '../components/Document';

export const config = {
  ...schema,
  functions,
  components: {
    Document: Document
  }
};
