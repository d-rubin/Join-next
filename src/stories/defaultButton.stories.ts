import type { Meta, StoryObj } from "@storybook/react";
import DefaultButton from "../components/buttons/Default";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Buttons/DefaultButton",
  component: DefaultButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof DefaultButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    text: "Button",
  },
};

export const Outlined: Story = {
  args: {
    text: "Button",
    outlined: true,
  },
};

export const FullWidth: Story = {
  args: {
    text: "Button",
    block: true,
  },
};

export const Loading: Story = {
  args: {
    text: "Button",
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    text: "Button",
    icon: "check",
  },
};
