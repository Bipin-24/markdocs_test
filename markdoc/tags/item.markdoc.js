import { Item } from '../../components/Item';

export default {
  render: Item,
  attributes: {
    className: { type: String },
    icon: { type: String },
    href: { type: String },
    title: { type: String }
  }
};
