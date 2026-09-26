import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 w-full border-t border-[#1f2228] bg-[#090a0c]">
      <div className="mx-auto flex min-h-[101px] w-full max-w-[1280px] flex-col items-center justify-center gap-4 px-4 py-6 sm:px-6 md:flex-row md:justify-between md:px-10 md:py-0">

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
          />

          <span className="font-oswald text-[14px] font-bold text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-[12px] font-normal leading-4 text-[#6B7280] md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;