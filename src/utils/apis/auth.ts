import { LoginPayload, LoginSchema } from "@/utils/types/auth";
import { sampleLogin } from "@/utils/datas/auth";
import { IResponse } from "@/utils/types/api";

export const userLogin = (body: LoginSchema) => {
  return new Promise<IResponse<LoginPayload>>((resolve, reject) => {
    const findUser = sampleLogin.find((data) => data.email === body.email);

    if (findUser) {
      const isPasswordValid = findUser.password === body.password;

      if (isPasswordValid) {
        resolve({
          message: "Login success",
          data: {
            email: findUser.email,
            name: findUser.name,
            role: findUser.role,
          },
        });
      } else {
        reject({ message: "Incorrect email or password" });
      }
    } else {
      reject({ message: "Incorrect email or password" });
    }
  });
};
