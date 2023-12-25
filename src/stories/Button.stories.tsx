import type { Meta, StoryObj } from "@storybook/react";
import ButtonComponent from "../components/Basics/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ButtonComponent> = {
  title: "Stories/Button",
  component: ButtonComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // layout: "centered",
  },
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

export const Outlined: Story = {
  args: {
    outlined: true,
  },
};

export const FullWidth: Story = {
  args: {
    block: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    icon: "check",
  },
};

export const Dark: Story = {
  args: { disabled: false },
  render: (args) => (
    <div className="dark">
      <div className="p-8 dark:bg-defaultColorDark">
        <ButtonComponent {...args} />
      </div>
    </div>
  ),
};
