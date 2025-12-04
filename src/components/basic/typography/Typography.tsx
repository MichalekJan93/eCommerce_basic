type ITypography = ITypographyProps & {
  type: "H1" | "H2" | "H3" | "H4" | "p" | "blockquote" | "small" | "muted";
};

export interface ITypographyProps {
  intlId?: string;
  intlParams?: Record<string, string>;
  children?: React.ReactNode;
}

const Typography = (props: ITypography) => {
  return <div>Typography</div>;
};

export default Typography;
