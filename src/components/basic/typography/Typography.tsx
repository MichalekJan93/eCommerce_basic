import { useTranslation } from "react-i18next";
import TypographyH1 from "./TypographyH1";
import TypographyH2 from "./TypographyH2";
import TypographyH3 from "./TypographyH3";
import TypographyH4 from "./TypographyH4";
import TypographyP from "./TypographyP";
import TypographyBlockquote from "./TypographyBlockquote";
import TypographySmall from "./TypographySmall";
import TypographyMuted from "./TypographyMuted";

type TypographyType =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "p"
  | "blockquote"
  | "small"
  | "muted";

interface ITypography {
  type: TypographyType;
  intlId?: string;
  intlParams?: Record<string, string>;
  children?: React.ReactNode;
}

const componentMap: Record<
  TypographyType,
  React.ComponentType<{ children: React.ReactNode }>
> = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  p: TypographyP,
  blockquote: TypographyBlockquote,
  small: TypographySmall,
  muted: TypographyMuted,
};

const Typography = ({
  type = "p",
  intlId,
  intlParams,
  children,
}: ITypography) => {
  const { t } = useTranslation();

  const content = children ?? (intlId ? t(intlId, intlParams) : null);

  const Component = componentMap[type];

  return <Component>{content}</Component>;
};

export default Typography;
