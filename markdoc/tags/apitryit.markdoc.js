import { ApiTryIt } from '../../components';

export default {
  render: ApiTryIt,
  description: 'Interactive API testing widget',
  attributes: {
    endpoint: {
      type: String,
      default: '/api/example',
      description: 'API endpoint URL'
    },
    method: {
      type: String,
      default: 'GET',
      description: 'HTTP method'
    },
    description: {
      type: String,
      default: 'Try this API endpoint',
      description: 'Description of the endpoint'
    },
    parameters: {
      type: Array,
      default: [],
      description: 'Array of parameter objects with name, description, and required fields'
    },
    headers: {
      type: Array,
      default: [],
      description: 'Array of header objects'
    },
    body: {
      type: Object,
      default: null,
      description: 'Default request body'
    }
  },
  children: []
};
