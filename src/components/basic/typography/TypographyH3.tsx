const TypographyH3 = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  );
};

export default TypographyH3;
