"use client";

import { authenticate } from "@/actions/auth/authLogin";

import Link from "next/link";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

export const LoginForm = () => {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (errorMessage === "Success") {
      window.location.replace("/");
    }
  }, [errorMessage]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      {errorMessage === "CredentialError" && (
        <div>
          <p className="text-red-500 mb-5">Credenciales incorrectas</p>
        </div>
      )}

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={clsx({ "btn-primary": !pending, "btn-disabled": pending })}
    >
      Ingresar
    </button>
  );
};
