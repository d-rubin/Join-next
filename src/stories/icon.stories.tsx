import type { Meta, StoryObj } from "@storybook/react";
import IconComponent from "../components/Basics/Icon";

const meta: Meta<typeof IconComponent> = {
  title: "Stories/Icon",
  component: IconComponent,
};

export default meta;
type Story = StoryObj<typeof IconComponent>;

export const Icon: Story = {
  args: {
    icon: "addTask",
    onClick: false,
  },
};

export const Dark: Story = {
  args: {
    icon: "addTask",
    onClick: false,
  },
  render: (args) => (
    <div className="dark">
      <div className="p-8 dark:bg-defaultColorDark">
        <IconComponent {...args} />
      </div>
    </div>
  ),
};
