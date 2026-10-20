"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  validateLogin,
  validateRegister,
  type LoginInput,
  type RegisterInput,
} from "@/lib/student-fields";
import type { StudentPublic } from "@/lib/student";

const emptyRegister: RegisterInput = {
  name: "",
  email: "",
  password: "",
  collegeName: "",
  batch: "",
};

const emptyLogin: LoginInput = {
  email: "",
  password: "",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
        {label}
      </span>
      {children}
    </label>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
        <path
          d="M3 3l18 18M10.5 10.7a2.5 2.5 0 003.5 3.5M9.9 5.2A10.5 10.5 0 0121 12a10.5 10.5 0 01-3.1 4.4M6.1 6.6A10.5 10.5 0 003 12a10.5 10.5 0 0011.2 6.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <path
        d="M2.5 12S6.5 5.5 12 5.5 21.5 12 21.5 12 17.5 18.5 12 18.5 2.5 12 2.5 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PasswordField({
  value,
  onChange,
  autoComplete,
  showPassword,
  onToggleShow,
}: {
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  showPassword: boolean;
  onToggleShow: () => void;
}) {
  return (
    <div className="relative mt-2">
      <input
        className={`${inputClassName} mt-0 pr-12`}
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 grid w-11 place-items-center text-foreground/45 transition-colors hover:text-foreground"
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        onClick={onToggleShow}
      >
        <EyeIcon open={showPassword} />
      </button>
    </div>
  );
}

const inputClassName =
  "mt-2 h-11 w-full border border-foreground/15 bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent";

export function AuthPanel({
  view,
  onViewChange,
}: {
  view: "register" | "login";
  onViewChange: (view: "register" | "login") => void;
}) {
  const router = useRouter();
  const { setStudent, closeAuth, pendingRedirect, clearPendingRedirect } =
    useAuth();
  const [register, setRegister] = useState(emptyRegister);
  const [login, setLogin] = useState(emptyLogin);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function switchView(next: "register" | "login") {
    setError(null);
    setShowPassword(false);
    onViewChange(next);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError =
      view === "register" ? validateRegister(register) : validateLogin(login);
    if (validationError) {
      setError(validationError);
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch(
        view === "register" ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(view === "register" ? register : login),
        },
      );
      const data = (await response.json()) as {
        student?: StudentPublic;
        error?: string;
      };

      if (!response.ok || !data.student) {
        setError(data.error ?? "Something went wrong. Try again.");
        return;
      }

      const next = pendingRedirect;
      setStudent(data.student);
      clearPendingRedirect();
      closeAuth();
      if (next) {
        router.push(next);
      }
      router.refresh();
    } catch {
      setError(
        "The request did not go through. Check your connection and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="border-t border-foreground/10 bg-background/95 p-5 shadow-[0_24px_80px_rgba(70,119,226,0.12)] backdrop-blur-sm sm:border sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent sm:text-[11px]">
        {view === "register" ? "Create account" : "Log in"}
      </p>
      <h2 className="mt-2.5 text-[1.35rem] font-normal leading-[1.15] tracking-tight text-foreground sm:mt-3 sm:text-[1.7rem] sm:leading-[1.1]">
        {view === "register"
          ? "Start with your college details."
          : "Use your email and password."}
      </h2>
      <p className="mt-2.5 text-[13px] leading-6 text-foreground/65 sm:mt-3 sm:text-sm">
        {view === "register"
          ? "One TechCity account opens roadmaps and Spardha. Your session stays signed in for 12 hours."
          : "Sign in with the same email and password you use for Spardha."}
      </p>

      <form className="mt-6 grid gap-4" onSubmit={submit} noValidate>
        {view === "register" ? (
          <>
            <Field label="Name">
              <input
                className={inputClassName}
                name="name"
                autoComplete="name"
                value={register.name}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Email">
              <input
                className={inputClassName}
                name="email"
                type="email"
                autoComplete="email"
                value={register.email}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Password">
              <PasswordField
                value={register.password}
                autoComplete="new-password"
                showPassword={showPassword}
                onToggleShow={() => setShowPassword((current) => !current)}
                onChange={(password) =>
                  setRegister((current) => ({ ...current, password }))
                }
              />
            </Field>
            <Field label="College name">
              <input
                className={inputClassName}
                name="collegeName"
                autoComplete="organization"
                value={register.collegeName}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    collegeName: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Batch">
              <input
                className={inputClassName}
                name="batch"
                placeholder="2026"
                value={register.batch}
                onChange={(event) =>
                  setRegister((current) => ({
                    ...current,
                    batch: event.target.value,
                  }))
                }
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="Email">
              <input
                className={inputClassName}
                name="email"
                type="email"
                autoComplete="email"
                value={login.email}
                onChange={(event) =>
                  setLogin((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </Field>
            <Field label="Password">
              <PasswordField
                value={login.password}
                autoComplete="current-password"
                showPassword={showPassword}
                onToggleShow={() => setShowPassword((current) => !current)}
                onChange={(password) =>
                  setLogin((current) => ({ ...current, password }))
                }
              />
            </Field>
          </>
        )}

        {error ? (
          <p
            role="alert"
            className="border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-2.5 text-sm leading-6 text-accent-secondary"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 inline-flex h-11 items-center justify-center bg-accent px-5 text-[15px] font-medium text-on-accent transition-colors hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
        >
          {pending
            ? view === "register"
              ? "Creating account…"
              : "Signing in…"
            : view === "register"
              ? "Create account"
              : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-foreground/60">
        {view === "register" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              onClick={() => switchView("login")}
            >
              Log in
            </button>
          </>
        ) : (
          <>
            New student?{" "}
            <button
              type="button"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4"
              onClick={() => switchView("register")}
            >
              Create an account
            </button>
          </>
        )}
      </p>
    </div>
  );
}
