import Image from "next/image";

export const Logo = (props: { className?: string }) => (
  <Image alt="Logo" height={40} src="/assets/logo.svg" width={150} {...props} />
);
