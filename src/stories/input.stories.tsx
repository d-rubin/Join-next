import { Meta, StoryObj } from "@storybook/react";
import DefaultInput from "../components/inputs/Default";

const meta: Meta = {
  title: "Stories/Input",
  component: DefaultInput,
  args: {
    placeholder: "Test placeholder",
    type: "email",
    name: "email",
    icon: "mail",
    disabled: false,
    onIconClick: false,
  },
};
export default meta;
type Story = StoryObj<typeof DefaultInput>;

export const Default: Story = {};

export const Dark: Story = {
  render: (args) => (
    <div className="dark">
      <div className="p-8 dark:bg-defaultColorDark">
        <DefaultInput {...args} />
      </div>
    </div>
  ),
};
