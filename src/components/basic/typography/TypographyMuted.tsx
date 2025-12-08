const TypographyMuted = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <p className="text-muted-foreground text-sm" {...props}>
      {children}
    </p>
  );
};

export default TypographyMuted;
