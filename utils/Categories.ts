import { AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import {
  MdOutlineKeyboard,
  MdStorefront,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import { RiAppleLine } from "react-icons/ri";
import { TbDeviceDesktopCog } from "react-icons/tb";

export const categories = [
  {
    label: "Tout",
    icon: MdStorefront,
  },
  {
    label: "iPhone",
    icon: MdOutlinePhoneIphone,
  },
  {
    label: "Ordinateur",
    icon: AiOutlineLaptop,
  },
  {
    label: "Bureautique",
    icon: AiOutlineDesktop,
  },
  {
    label: "Logiciel",
    icon: TbDeviceDesktopCog,
  },
  {
    label: "Accessoires",
    icon: MdOutlineKeyboard,
  },
  {
    label: "Accessoires Apple",
    icon: RiAppleLine,
  },
];
