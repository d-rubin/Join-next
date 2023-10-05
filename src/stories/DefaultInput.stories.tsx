import { Meta, StoryObj } from "@storybook/react";
import DefaultInput from "../components/inputs/Default";

const meta: Meta = {
  title: "Inputs/DefaultInput",
  component: DefaultInput,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Test placeholder",
    type: "email",
    name: "email",
    required: true,
    icon: "mail",
  },
};
