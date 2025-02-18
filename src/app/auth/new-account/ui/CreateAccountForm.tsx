"use client";

import { registerUser } from "@/actions";
import { login } from "@/actions/auth/authLogin";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormsInput = {
  name: string;
  email: string;
  password: string;
};

export const CreateAccounForm = () => {
  const [errorMessage, setErrorMesage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsInput>();

  const onSubmit = async (data: FormsInput) => {
    setErrorMesage("");
    const { name, email, password } = data;
    const response = await registerUser(name, email, password);
    if (!response.ok) {
      setErrorMesage(response.message);
      return;
    }

    await login(email, password);
    window.location.replace("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-400": errors.name,
        })}
        type="text"
        {...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-400": errors.email,
        })}
        type="email"
        {...register("email", { required: true })}
      />

      <label htmlFor="password">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-400": errors.password,
        })}
        type="password"
        {...register("password", { required: true })}
      />

      {errorMessage && <p className="text-red-500 u-my-3">{errorMessage}</p>}

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
