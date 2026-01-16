import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("homePage");

  return (
    <section className="flex flex-col items-center justify-center p-40">
      <h2 className="text-center font-bold text-2xl text-black lg:text-5xl dark:text-white">
        {t("title")}
      </h2>
      <p className="max-w-3xl px-3 text-center text-base">{t("desc")}</p>
    </section>
  );
}
