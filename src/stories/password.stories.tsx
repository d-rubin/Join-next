import { Meta, StoryObj } from "@storybook/react";
import Password from "../components/inputs/Password";

const meta: Meta = {
  title: "Stories/Password",
  component: Password,
  args: {
    placeholder: "Test placeholder",
    name: "password",
    required: true,
  },
};
export default meta;
type Story = StoryObj<typeof Password>;

export const Default: Story = {};

export const Dark: Story = {
  render: (args) => (
    <div className="dark">
      <div className="p-8 dark:bg-defaultColorDark">
        <Password {...args} />
      </div>
    </div>
  ),
};
