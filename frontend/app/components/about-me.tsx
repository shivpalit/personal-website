import MaxWidthWrapper from "~/components/max-width-wrapper";
import Connect from "~/components/connect";
import Available from "~/components/available";
import TechStack from "~/components/tech-stack";
import ExperienceCard from "~/components/experience-card";
import ResumeCard from "~/components/resume-card";

export default function AboutMe() {
  return (
    <MaxWidthWrapper className="pb-10 pt-5 md:pb-20 md:pt-10">
      <h2 className="text-4xl font-bold mb-4">About me</h2>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
        <div className="grid gap-4">
          <Connect />
          <div className="grid grid-cols-2 gap-4">
            <ExperienceCard />
            <ResumeCard />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TechStack />
          <Available />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
