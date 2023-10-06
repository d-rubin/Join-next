import { Meta } from "@storybook/react";
import Text from "../components/Text";

const meta: Meta = {
  component: Text,
  title: "Texts",
};
export default meta;

type Story = typeof meta;

export const TextDefault: Story = {
  args: {
    text: "hallo ich bin ein Text",
  },
};
