import {
  Boxes,
  CodeXml,
  Headphones,
  Landmark,
  Megaphone,
  Palette,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Engineering & Tech": CodeXml,
  "Design & Creative": Palette,
  "Marketing & Sales": Megaphone,
  "Finance & Accounting": Landmark,
  "Customer Support": Headphones,
  Operations: Boxes,
  "People & HR": UsersRound,
};
