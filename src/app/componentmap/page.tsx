import DefaultButton from "../../components/buttons/Default";
import BigButton from "../../components/buttons/BigButton";
import Icon from "../../components/Icon";
import { iconLib } from "../../iconlib/iconLib";
import DefaultInput from "../../components/inputs/Default";

const ComponentMap = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex flex-row gap-2">
        <DefaultButton text="Button" outlined icon="addTask" bold />
        <BigButton text="Button" icon="check" bold loading />
        <BigButton text="Button" icon="check" bold />
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        {Object.keys(iconLib).map((key: string) => {
          return <Icon key={key} icon={key} className="stroke-black" />;
        })}
      </div>
      <form className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 flex-wrap">
          <DefaultInput type="text" name="defaultInput" icon="lock" placeholder="Password" label="Base" />
          <DefaultInput
            type="email"
            name="anotherInput"
            icon="mail"
            placeholder="Email"
            block
            required
            errorText="Email wird benötigt"
          />
        </div>
        <DefaultButton text="submit" />
      </form>
    </div>
  );
};

export default ComponentMap;
