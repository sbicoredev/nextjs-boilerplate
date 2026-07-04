import { Header } from "~/components/sections/header";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grid grow">{children}</main>
    </div>
  );
}
