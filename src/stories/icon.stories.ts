import type { Meta, StoryObj } from "@storybook/react";
import Icon from "../components/Icon";

const meta: Meta<typeof Icon> = {
  title: "Icons/Icon",
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const icon: Story = {
  args: {
    icon: "addTask",
  },
};
