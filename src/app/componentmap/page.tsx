import DefaultButton from "../../components/buttons/Default";
import BigButton from "../../components/buttons/BigButton";

const ComponentMap = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-2">
        <DefaultButton text="Button" outlined icon="addTask" bold />
        <BigButton text="Button" icon="check" bold loading />
        <BigButton text="Button" icon="check" bold />
      </div>
    </div>
  );
};

export default ComponentMap;
