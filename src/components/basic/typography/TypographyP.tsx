const TypographyP = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <p className="leading-7 not-first:mt-6" {...props}>
      {children}
    </p>
  );
};

export default TypographyP;
