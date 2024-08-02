import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Theme, useTheme } from "@/components/theme-provider";
import Layout from "@/components/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Language, useLanguage } from "@/components/language-provider";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>{t("Navigation Settings")}</CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            "flex flex-col gap-3",
            "[&>div]:flex [&>div]:items-center [&>div]:gap-3 [&>div]:w-[50%]"
          )}
        >
          <div>
            <p className="w-full">{t("Settings Theme")}</p>
            <Select
              onValueChange={(e) => setTheme(e as Theme)}
              defaultValue={theme}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Settings Theme")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t("Theme Light")}</SelectItem>
                <SelectItem value="dark">{t("Theme Dark")}</SelectItem>
                <SelectItem value="system">{t("Theme System")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="w-full">{t("Settings Language")}</p>
            <Select
              onValueChange={(e) => setLanguage(e as Language)}
              defaultValue={language}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Settings Language")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="id">Indonesia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SettingsPage;
