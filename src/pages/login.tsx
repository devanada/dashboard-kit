import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { toast } from "sonner";

import { CustomFormInput } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { loginSchema, LoginSchema } from "@/utils/types/auth";
import { userLogin } from "@/utils/apis/auth";
import { useAuthStore } from "@/utils/states";

const LoginPage = () => {
  const { t } = useTranslation();
  const addAuth = useAuthStore((state) => state.addAuth);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const result = await userLogin(data);

      toast.success(result.message);
      addAuth(result.data);
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
    }
  }

  return (
    <Layout>
      <Card className="m-auto w-3/4 md:w-4/6 lg:w-2/6">
        <CardHeader>
          <div className="p-6 flex flex-col items-center gap-2">
            <Globe className="w-10 h-10 text-blue-600" />
            <p className="text-muted-foreground text-center font-bold tracking-wider">
              Dashboard Kit
            </p>
          </div>
          <CardTitle className="text-2xl text-center">
            {t("Login Card Title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("Login Card Desc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              data-testid="form-login"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-5">
                <CustomFormInput
                  control={form.control}
                  name="email"
                  label="EMAIL"
                  data-testid="input-email"
                  placeholder="Email address"
                  type="email"
                />
                <CustomFormInput
                  control={form.control}
                  name="password"
                  label={t("Login Form Pass")}
                  data-testid="input-password"
                  placeholder="Password"
                  secureTextEntry
                  helper={
                    <Link
                      to="#"
                      className="ml-auto inline-block text-sm text-muted-foreground"
                    >
                      {t("Login Form Forgot Pass")}
                    </Link>
                  }
                />
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </div>
              <div className="mt-8 mb-4 text-center text-sm text-muted-foreground">
                {t("Login Register 1")}{" "}
                <Link to="#" className="text-blue-600">
                  {t("Login Register 2")}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default LoginPage;
