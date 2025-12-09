const TypographyH4 = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
};

export default TypographyH4;
