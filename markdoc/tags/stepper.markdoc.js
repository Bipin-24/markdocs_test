import { Tag } from '@markdoc/markdoc';
import StepByStep from '../../components/StepByStep';

export const stepper = {
  render: StepByStep,
  description: 'Interactive step-by-step component with media support',
  attributes: {
    initial: { type: Number, default: 0 },
  },
  transform(node, config) {
    const steps = node.children
      .filter((n) => n.tag === 'step')
      .map((n) => ({
        title: n.attributes.title,
        img: n.attributes.img,
        gif: n.attributes.gif,
        video: n.attributes.video,
        poster: n.attributes.poster,
        content: n.transformChildren(config),
        hotspots: n.attributes.hotspots,
      }));
    return new Tag(this.render, { steps, initial: node.attributes.initial });
  },
};

export const step = {
  render: () => null,
  description: 'A single step within the stepper',
  attributes: {
    title: { type: String },
    img: { type: String },
    gif: { type: String },
    video: { type: String },
    poster: { type: String },
    hotspots: { type: Array },
  },
};
