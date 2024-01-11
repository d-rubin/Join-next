import PagePadding from "../../../components/PagePadding";
import DropArea from "../../../components/DropArea";
import { DnDContextProvider } from "../../../contexts/DnD.context";

const BoardPage = () => {
  // todo: Add Loading Elements

  return (
    <PagePadding>
      <div className="flex flex-col gap-4">
        <DnDContextProvider>
          <DropArea />
        </DnDContextProvider>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
