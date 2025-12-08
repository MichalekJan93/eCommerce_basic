const TypographyH4 = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
      {children}
    </h4>
  );
};

export default TypographyH4;
