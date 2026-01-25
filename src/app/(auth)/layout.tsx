import { Header } from "~/components/sections/header";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
