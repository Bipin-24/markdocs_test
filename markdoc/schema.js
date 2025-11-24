import document from './nodes/document.markdoc.js';
import baseNodes from './nodes';
import tags from './tags';

export const nodes = {
  document,
  ...baseNodes,
};

const schema = {
  nodes,
  tags,
};

export default schema;
