import { sampleTasks } from "@/utils/datas/tasks";
import { ITask } from "@/utils/types/overview";
import { IResponse } from "@/utils/types/api";

export const getTasks = (query: string) => {
  return new Promise<IResponse<ITask[]>>((resolve) => {
    setTimeout(() => {
      const filterData = sampleTasks.filter((task) =>
        task.name.toLocaleLowerCase().includes(query)
      );

      resolve({
        message: "Get tasks data successfully",
        data: filterData,
      });
    }, 1000);
  });
};
