import { Authentification, AuthentificationProvider } from "@/providers/authentificationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSignup = () => {
  const InputsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });

  type Inputs = z.infer<typeof InputsSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(InputsSchema),
  });


  const { signUpUser, errorMessage } = useContext(
    Authentification
  ) as AuthentificationProvider;

  const signup = ({ email, password }: Inputs) => {
    signUpUser(email, password);
 
  };

  return (
    <form className="flex flex-col items-center justify-center w-2/3 gap-4 sm:w-full " onSubmit={handleSubmit(signup)}>
      <input
        defaultValue={"test@test.fr"}
        {...register("email")}
        placeholder="email"
        className="w-full p-4 border-2 border-gray-400 sm:w-2/3"
      />
      {errors.email?.message && <p>{errors.email.message}</p>}

      <input
        defaultValue={"testtest"}
        type="password"
        {...register("password")}
        placeholder="Enter your password"
        className="w-full p-4 border-2 border-gray-400 sm:w-2/3"
      />
      {errors.password?.message && <p>{errors.password.message}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="submit"
        className="w-full p-3 text-white bg-red-700 rounded-sm sm:w-2/3"
        value={"S'inscrire"}
      />
    </form>
  );
};

export default FormSignup;
