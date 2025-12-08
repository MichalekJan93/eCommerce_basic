const TypographySmall = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <small className="text-sm leading-none font-medium" {...props}>
      {children}
    </small>
  );
};

export default TypographySmall;
