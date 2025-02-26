export const metadata = {
  title: "Learn Beyond Limits",
  description: "Education for Afghan girls, grades 7-12, offline and secure.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="my-12">{children}</div>;
}
