import { Meta } from "@storybook/react";
import Text from "../components/Text";

const meta: Meta = {
  component: Text,
  title: "Texts/Text",
};
export default meta;

type Story = typeof meta;

export const Default: Story = {
  args: {
    text: "hallo ich bin ein Text",
  },
};
