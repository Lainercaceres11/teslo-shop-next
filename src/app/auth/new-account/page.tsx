import { titleFont } from "@/config/fonts";
import { CreateAccounForm } from "./ui/CreateAccountForm";

export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>
        Crear nueva cuenta
      </h1>

      <CreateAccounForm />
    </main>
  );
}
