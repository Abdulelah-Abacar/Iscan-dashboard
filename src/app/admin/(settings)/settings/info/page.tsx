"use client";
import { useTranslations } from "next-intl";

export default function Info() {
  const t = useTranslations("Info");

  return (
    <>
      <h1 className="text-5xl font-normal mb-8">{t("title")}</h1>
      <section className="bg-gray-200 rounded-4xl p-5 md:p-10">
        <section className="md:w-[500px] space-y-5">
          <article>
            <h2 className="text-2xl md:text-4xl font-normal">{t("password.title")}</h2>
            <div className="mt-3 md:w-1/2 md:text-center">
              <button className="px-5 py-2.5 text-lg rounded-2xl bg-white">
                {t("password.changeButton")}
              </button>
              <br />
              <small className="text-xs">
                {t("password.lastChanged", { days: 9 })}
              </small>
            </div>
          </article>
          <article>
            <h2 className="text-2xl md:text-4xl font-normal">
              {t("secondaryEmail.title")}
            </h2>
            <div className="mt-3 md:w-1/2 md:text-center">
              <button className="px-6 py-2.5 text-lg rounded-2xl bg-white">
                {t("secondaryEmail.addButton")}
              </button>
              <br />
              <small className="text-xs">
                {t("secondaryEmail.noEmail")}
              </small>
            </div>
          </article>
          <article>
            <h2 className="text-2xl md:text-4xl font-normal">
              {t("twoStepAuth.title")}
            </h2>
            <div className="mt-3 md:w-1/2 md:text-center">
              <button className="px-6 py-2.5 text-lg rounded-2xl bg-white">
                {t("twoStepAuth.turnOnButton")}
              </button>
              <br />
              <small className="text-xs">
                {t("twoStepAuth.description")}
              </small>
            </div>
          </article>
        </section>
      </section>
    </>
  );
}