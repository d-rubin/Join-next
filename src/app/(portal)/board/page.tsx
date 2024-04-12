"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PagePadding from "../../../components/PagePadding";
import DropArea from "../../../components/DropArea";

const BoardPage = () => {
  return (
    <PagePadding>
      <div className="flex flex-col gap-4 lg:h-full">
        <DndProvider backend={HTML5Backend}>
          <DropArea />
        </DndProvider>
      </div>
    </PagePadding>
  );
};

export default BoardPage;
