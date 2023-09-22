const HelpPage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-screen-lg">
      <section>
        <h2 className="text-4xl font-bold cursor-default">Help</h2>
        <p>
          Welcome to the help page for Join, your guide to using our kanban project management tool. Here, we'll provide
          an overview of what Join is, how it can benefit you, and how to use it.
        </p>
      </section>
      <section>
        <h3 className="text-3xl font-bold cursor-default">What is Join?</h3>
        <p>
          Join is a kanban-based project management tool designed and built by a group of dedicated students as part of
          their web development bootcamp at the Developer Akademie.
        </p>
        <p>
          Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit
          work-in-progress, and maximize efficiency (or flow). Join leverages the principles of kanban to help users
          manage their tasks and projects in an intuitive, visual interface.
        </p>
        <p>
          It is important to note that Join is designed as an educational exercise and is not intended for extensive
          business usage. While we strive to ensure the best possible user experience, we cannot guarantee consistent
          availability, reliability, accuracy, or other aspects of quality regarding Join.
        </p>
      </section>
      <section>
        <h3 className="text-3xl font-bold cursor-default">How to use it</h3>
        <p>Here is a step-by-step guide on how to use Join:</p>
      </section>
      <section>
        <h3 className="text-2xl font-bold cursor-default">1. Exploring the Board</h3>
        <p>
          When you log in to Join, you'll find a default board. This board represents your project and contains four
          default lists: "To Do", "In Progress", “Await feedback” and "Done".
        </p>
      </section>
      <section>
        <h3 className="text-2xl font-bold cursor-default">2. Create Contacts</h3>
        <p>
          In Join, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New
          contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can
          interact with the tasks on the board.
        </p>
      </section>
      <section>
        <h3 className="text-2xl font-bold cursor-default">3. Adding Cards</h3>
        <p>
          Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the
          "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task
          name, description, due date, assignees, etc.
        </p>
      </section>
      <h3 className="text-2xl font-bold cursor-default">4. Moving Cards</h3>
      <p>
        As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card
        from one list to another.
      </p>
      <section>
        <h3 className="text-2xl font-bold cursor-default">5. Deleting Cards</h3>
        <p>
          Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will
          permanently remove it from the board. Please exercise caution when deleting cards, as this action is
          irreversible. Remember that using Join effectively requires consistent updates from you and your team to
          ensure the board reflects the current state of your project. Have more questions about Join? Feel free to
          contact us at [Your Contact Email]. We're here to help you!
        </p>
      </section>
    </div>
  );
};

export default HelpPage;
