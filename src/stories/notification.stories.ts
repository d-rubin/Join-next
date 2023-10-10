import { Meta, StoryObj } from "@storybook/react";
import Notification from "../components/Notification";

const meta: Meta = {
  title: "Feedback/Notification",
  component: Notification,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Hallooo",
  },
};

export const Visible: Story = {
  args: {
    text: "Hallooo",
    trigger: true,
  },
};
