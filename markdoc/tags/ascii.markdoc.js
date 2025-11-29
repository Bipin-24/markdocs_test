import { Tag } from '@markdoc/markdoc';
import { Ascii, TYPE_MAP } from '../../components/Ascii';

const matches = Object.keys(TYPE_MAP);

export default {
  render: Ascii,
  attributes: {
    primary: {
      type: String,
      matches,
      required: true
    }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    
    // If primary is not set but there's a first child that's a string, use it as primary
    if (!attributes.primary && children.length > 0 && typeof children[0] === 'string') {
      attributes.primary = children[0].trim();
      return new Tag(this.render, attributes, []);
    }
    
    return new Tag(this.render, attributes, children);
  }
};

