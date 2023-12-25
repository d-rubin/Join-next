import { Meta, StoryObj } from "@storybook/react";
import CheckboxComponent from "../components/Basics/Checkbox";

const meta: Meta<typeof CheckboxComponent> = {
  title: "Stories/Checkbox",
  component: CheckboxComponent,
};
export default meta;
type Story = StoryObj<typeof CheckboxComponent>;

export const Checkbox: Story = {
  args: {
    text: "Ich bin eine Checkbox",
  },
};

export const Dark: Story = {
  args: {
    text: "Ich bin eine Checkbox",
  },
  render: (args) => (
    <div className="dark">
      <div className="p-8 dark:bg-defaultColorDark">
        <CheckboxComponent {...args} />
      </div>
    </div>
  ),
};
