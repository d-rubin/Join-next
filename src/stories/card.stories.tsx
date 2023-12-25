import { Meta, StoryObj } from "@storybook/react";
import CardComponent from "../components/Basics/Card";
import Text from "../components/Basics/Text";

const meta: Meta<typeof CardComponent> = {
  component: CardComponent,
  title: "Stories/Card",
  args: {
    children: <Text text="Moin Meister" />,
  },
};

export default meta;
type Story = StoryObj<typeof CardComponent>;

export const Card: Story = {};

export const Dark: Story = {
  render: (args) => (
    <div className="dark h-full w-full p-10">
      <CardComponent {...args} />
    </div>
  ),
};
