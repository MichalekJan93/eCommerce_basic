import Typography from "@/components/basic/typography/Typography";

const InfoPage = () => {
  return (
    <div className="py-16 sm:py-24 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
      <Typography
        type="H1"
        className="text-4xl sm:text-5xl"
        intlId="common:info_demo_title"
      />
      <Typography
        type="p"
        className="mt-6"
        intlId="common:info_demo_description"
      />
      <Typography
        type="muted"
        className="mt-4"
        intlId="common:info_demo_note"
      />
    </div>
  );
};

export default InfoPage;
