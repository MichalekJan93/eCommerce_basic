import type { ITypographyProps } from "./Typography";

const TypographyH1 = (props: ITypographyProps) => {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
};

export default TypographyH1;
