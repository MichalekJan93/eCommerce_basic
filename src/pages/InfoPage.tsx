import Typography from "@/components/basic/typography/Typography";

const InfoPage = () => {
  return (
    <div className="py-16 sm:py-24 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
      <Typography type="H1" className="text-4xl sm:text-5xl">
        Demo Page
      </Typography>
      <Typography type="p" className="mt-6">
        This is a presentation e-commerce website created to showcase my
        experience with React, TypeScript, and modern web development
        technologies.
      </Typography>
      <Typography type="muted" className="mt-4">
        The page you were looking for is not implemented as this is only a demo
        project. Feel free to explore the products section to see the full
        functionality.
      </Typography>
    </div>
  );
};

export default InfoPage;
