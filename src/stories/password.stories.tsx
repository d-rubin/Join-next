import { Meta, StoryObj } from "@storybook/react";
import Password from "../components/inputs/Password";

const meta: Meta = {
  title: "DataEntry/Password",
  component: Password,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Test placeholder",
    name: "password",
    required: true,
  },
};
