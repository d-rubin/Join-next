import type { Meta, StoryObj } from "@storybook/react";
import Icon from "../components/Icon";

const meta = {
  title: "Icons",
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "addTask",
  },
};
