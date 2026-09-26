import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10">
      <div className="w-full overflow-hidden rounded-2xl border border-[#25282e] bg-[#15171c]">

        <div className="flex w-full flex-col md:min-h-[365px] md:flex-row md:items-center md:justify-between">

          <div className="w-full px-5 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10 md:w-[60%] md:px-10 md:py-12 lg:px-[57px]">

            <p className="mb-4 text-[11px] font-bold text-[#C2F800] sm:mb-5">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-oswald max-w-[620px] text-[36px] font-extrabold uppercase leading-[1.08] text-white sm:text-[46px] md:text-[50px] lg:text-[60px] lg:leading-[1.05]">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>

            <p className="mt-4 max-w-[540px] text-[14px] font-normal leading-[1.6] text-[#969BA5] sm:mt-5 sm:text-[16px] sm:leading-[1.5]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#C2F800] px-5 py-3 text-[12px] font-bold text-black transition hover:bg-[#d0ff33] sm:mt-7 sm:px-6"
            >
              BROWSE WORKOUTS
            </Link>

          </div>

          <div className="flex w-full items-center justify-center px-5 pb-8 pt-2 sm:pb-10 md:w-[40%] md:px-6 md:py-8">

            <Image
              src="/banner.png"
              alt="Workout illustration"
              width={334}
              height={334}
              priority
              className="h-auto w-[210px] max-w-full object-contain sm:w-[260px] md:w-[290px] lg:w-[334px]"
            />

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;