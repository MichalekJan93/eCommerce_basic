const TypographyH2 = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <h2
      className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    >
      {children}
    </h2>
  );
};

export default TypographyH2;
