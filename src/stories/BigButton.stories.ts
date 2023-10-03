import type { Meta, StoryObj } from "@storybook/react";
import BigButton from "../components/buttons/BigButton";

const meta = {
  title: "Buttons/BigButton",
  component: BigButton,
} satisfies Meta<typeof BigButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    text: "Button",
    icon: "check",
    bold: true,
  },
};

export const FullWidth: Story = {
  args: {
    text: "Button",
    icon: "check",
    bold: true,
    block: true,
  },
};
