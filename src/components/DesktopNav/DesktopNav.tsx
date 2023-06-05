import Image from "next/image";
import DesktopNavStyles from "./DesktopNav.module.scss";
import logoLight from "../../app/img/logo-light.svg";
import summaryIcon from "../../app/img/SummaryIcon.svg";
import boardIcon from "../../app/img/boardIcon.svg";
import addTaskIcon from "../../app/img/addTaskIcon.svg";
import contactsIcon from "../../app/img/contactsIcon.svg";
import legalNoticeIcon from "../../app/img/legalNoticeIcon.svg"

const DesktopNav = () => {
    const color = "--color-primary";

    return <div className="bg-primary w-2/12 min-w-[200px] max-w-[450px] h-full flex flex-col items-center justify-between text-white py-[5vh]">
        <Image alt="Logo" src={logoLight} width={100} />
        <div className="flex flex-col items-center justify-between w-full h-full pt-24">
            <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]" style={{ backgroundColor: color }}>
                    <Image src={summaryIcon} alt="Summary Icon" />
                    <p>Summary</p>
                </div>
                <div className="flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]" style={{ backgroundColor: color }}>
                    <Image src={boardIcon} alt="Summary Icon" />
                    <p>Board</p>
                </div>
                <div className="flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]" style={{ backgroundColor: color }}>
                    <Image src={addTaskIcon} alt="Summary Icon" />
                    <p>Add Task</p>
                </div>
                <div className="flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]" style={{ backgroundColor: color }}>
                    <Image src={contactsIcon} alt="Summary Icon" />
                    <p>Contacts</p>
                </div>
            </div>
            <div className="flex items-center justify-center w-full h-14 gap-4 cursor-pointer hover:bg-[--color-secondary]" style={{ backgroundColor: color }}>
                <Image src={legalNoticeIcon} alt="Legal Notice Icon" />
                <p>Legal Notice</p>
            </div>
        </div>
    </div>
}

export default DesktopNav;
