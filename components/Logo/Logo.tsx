import Image from "next/image";
import Link from "next/link";

const Logo = ({href} : {href: string}) => {
  return (
    <Link href={href} className="flex items-center gap-3">
      <Image
        src={"/logo.png"}
        alt="DentWise Logo"
        width={32}
        height={32}
        className="w-8"
      />
      DentWise
    </Link>
  );
};

export default Logo;
