import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Layout from "@/components/layout";
import {
  CustomFormInput,
  CustomFormSelect,
} from "@/components/custom-formfield";

import { ticketSchema, TicketSchema } from "@/utils/types/tickets";
import { postTicket } from "@/utils/apis/tickets";

const CreateTicketPage = () => {
  const { t } = useTranslation();

  const form = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      priority: "NORMAL",
    },
  });

  async function onSubmit(data: TicketSchema) {
    try {
      const result = await postTicket(data);
      form.reset();
      toast.success(result.message);
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
    }
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>{t("Navigation Create Ticket")}</CardTitle>
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
                  name="title"
                  label={t("Ticket Form Title")}
                  data-testid="input-title"
                  placeholder="Ticket title"
                />
                <CustomFormSelect
                  control={form.control}
                  name="priority"
                  label={t("Ticket Form Priority")}
                  data-testid="input-priority"
                  placeholder="Priority"
                  options={[
                    {
                      label: "HIGH",
                      value: "HIGH",
                    },
                    {
                      label: "NORMAL",
                      value: "NORMAL",
                    },
                    {
                      label: "LOW",
                      value: "LOW",
                    },
                  ]}
                />
                <Button type="submit" className="w-full">
                  {t("Ticket Form Button")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CreateTicketPage;
