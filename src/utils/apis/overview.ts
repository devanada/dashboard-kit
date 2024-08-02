import { sampleOverview } from "@/utils/datas/overview";
import { IOverview } from "@/utils/types/overview";
import { IResponse } from "@/utils/types/api";

export const getOverview = () => {
  return new Promise<IResponse<IOverview>>((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Get overview data successfully",
        data: sampleOverview,
      });
    }, 1000);
  });
};
