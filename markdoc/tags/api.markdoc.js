import { ApiLayout } from '../../components/ApiLayout';
import { ApiSection } from '../../components/ApiLayout';
import { ApiDescription } from '../../components/ApiLayout';
import { ApiCode } from '../../components/ApiLayout';
import { ApiEndpoint } from '../../components/ApiLayout';
import { ApiParameters } from '../../components/ApiLayout';
import { ApiParameter } from '../../components/ApiLayout';

export const apiLayout = {
  render: 'ApiLayout',
  description: 'Two-column layout for API documentation',
  children: ['tag', 'paragraph', 'heading', 'list'],
};

export const apiSection = {
  render: 'ApiSection',
  description: 'Section wrapper for API docs',
  children: ['tag', 'paragraph', 'heading', 'list'],
  attributes: {
    title: {
      type: String,
      description: 'Section title',
    },
    id: {
      type: String,
      description: 'Section ID for anchoring',
    },
  },
};

export const apiDescription = {
  render: 'ApiDescription',
  description: 'Left column content',
  children: ['tag', 'paragraph', 'heading', 'list', 'table'],
};

export const apiCode = {
  render: 'ApiCode',
  description: 'Right column code examples',
  children: ['fence'],
  attributes: {
    title: {
      type: String,
      description: 'Code block title',
    },
  },
};

export const apiEndpoint = {
  render: 'ApiEndpoint',
  description: 'API endpoint display',
  selfClosing: true,
  attributes: {
    method: {
      type: String,
      required: true,
      matches: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      description: 'HTTP method',
    },
    path: {
      type: String,
      required: true,
      description: 'API endpoint path',
    },
    description: {
      type: String,
      description: 'Endpoint description',
    },
  },
};

export const apiParameters = {
  render: 'ApiParameters',
  description: 'Parameters list',
  children: ['tag'],
};

export const apiParameter = {
  render: 'ApiParameter',
  description: 'Single parameter',
  children: ['paragraph'],
  attributes: {
    name: {
      type: String,
      required: true,
      description: 'Parameter name',
    },
    type: {
      type: String,
      description: 'Parameter type',
    },
    required: {
      type: Boolean,
      default: false,
      description: 'Is parameter required',
    },
    description: {
      type: String,
      description: 'Parameter description',
    },
  },
};

export default {
  'api-layout': apiLayout,
  'api-section': apiSection,
  'api-description': apiDescription,
  'api-code': apiCode,
  'api-endpoint': apiEndpoint,
  'api-parameters': apiParameters,
  'api-parameter': apiParameter,
};
