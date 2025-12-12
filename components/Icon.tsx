import { FC, MouseEventHandler } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  ArrowDown01Icon,
  Activity01Icon,
  AddSquareIcon,
  Alert01Icon,
  ArrangeIcon,
  BarCode02Icon,
  BoardMathIcon,
  Cancel01Icon,
  CricketBatIcon,
  CheckListIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  CustomerSupportIcon,
  ClipboardIcon,
  DashboardSquare01Icon,
  Delete02Icon,
  Download01Icon,
  Delete03Icon,
  DateTimeIcon,
  FileEmpty01Icon,
  FootballIcon,
  GameIcon,
  GroupItemsIcon,
  HomeIcon,
  HourglassIcon,
  InboxDownloadIcon,
  InformationCircleIcon,
  Location01Icon,
  Logout05Icon,
  Menu01Icon,
  Notification03Icon,
  NewReleasesIcon,
  PackageDeliveredIcon,
  PackageIcon,
  PackageOpenIcon,
  PackageOutOfStockIcon,
  PrinterIcon,
  PackageSearchIcon,
  PencilEdit02Icon,
  Remove01Icon,
  SearchingIcon,
  SearchIcon,
  Settings02Icon,
  SquareArrowUp01Icon,
  SquareArrowDown01Icon,
  ShoppingBasket02Icon,
  ShoppingCart02Icon,
  Tick01Icon,
  TickDouble03Icon,
  User03Icon,
  UserIcon,
  UserAdd01Icon,
  UserQuestion01Icon,
  UserCircle02Icon,
  ViewIcon,
  ViewOffSlashIcon,
  WarehouseIcon,
} from "@hugeicons/core-free-icons";

const iconMap = {
  Add01Icon,
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  ArrowDown01Icon,
  Activity01Icon,
  AddSquareIcon,
  Alert01Icon,
  ArrangeIcon,
  BarCode02Icon,
  BoardMathIcon,
  Cancel01Icon,
  CricketBatIcon,
  CancelCircleIcon,
  CheckListIcon,
  CheckmarkCircle02Icon,
  CustomerSupportIcon,
  ClipboardIcon,
  DashboardSquare01Icon,
  Delete02Icon,
  Download01Icon,
  Delete03Icon,
  DateTimeIcon,
  FileEmpty01Icon,
  FootballIcon,
  GameIcon,
  GroupItemsIcon,
  HomeIcon,
  HourglassIcon,
  InboxDownloadIcon,
  InformationCircleIcon,
  Logout05Icon,
  Location01Icon,
  Menu01Icon,
  Notification03Icon,
  NewReleasesIcon,
  PackageDeliveredIcon,
  PackageIcon,
  PackageOpenIcon,
  PackageOutOfStockIcon,
  PrinterIcon,
  PackageSearchIcon,
  PencilEdit02Icon,
  Remove01Icon,
  ShoppingCart02Icon,
  SearchingIcon,
  SearchIcon,
  Settings02Icon,
  SquareArrowUp01Icon,
  SquareArrowDown01Icon,
  ShoppingBasket02Icon,
  Tick01Icon,
  TickDouble03Icon,
  User03Icon,
  UserIcon,
  UserAdd01Icon,
  UserQuestion01Icon,
  UserCircle02Icon,
  ViewIcon,
  ViewOffSlashIcon,
  WarehouseIcon,
};

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const Icon: FC<IconProps> = ({
  name,
  size = 18,
  className,
  ariaLabel,
  onClick,
}) => {
  const icon = iconMap[name as keyof typeof iconMap];

  if (!icon) {
    console.warn(`Icon "${name}" not found in iconMap.`);
    return null;
  }

  const combinedClassName = onClick
    ? `${className || ""} cursor-pointer`
    : className || "";

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      className={`shrink-0  ${combinedClassName}`}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : "presentation"}
      onClick={onClick}
    />
  );
};

export default Icon;
