type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <main className="min-h-screen">{children}</main>;
}
