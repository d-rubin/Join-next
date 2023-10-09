import { Meta } from "@storybook/react";
import Checkbox from "../components/Checkbox";

const meta: Meta = {
  title: "DataEntry/Checkbox",
  component: Checkbox,
};
export default meta;
type Story = typeof meta;

export const checkbox: Story = {
  args: {
    onChange: console.log("onChange Triggered"),
    text: "Ich bin eine Checkbox",
  },
};
