"use client";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import SocialSignIn from "./SocialSignIn";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type UserRole = "seeker" | "recruiter" | "admin";

const SignUpForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }>({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = "Please enter a valid email address";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters";
      }
    }

    if (name === "role") {
      if (!["seeker", "recruiter", "admin"].includes(value)) {
        error = "Select an account type";
      }
    }

    return error;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSignup = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      role: validateField("role", formData.role),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    const { error } = await authClient.signUp.email({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
      callbackURL: "/",
    });

    if (error) {
      toast.add({
        type: "error",
        description: error.message || "Try again",
      });

      return;
    }

    toast.add({
      type: "success",
      description: "Account Created Successfull",
    });
    router.refresh();
    router.push("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} noValidate>
            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  required
                />
                <FieldError id="name-error">{errors.name}</FieldError>
              </Field>

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  required
                />
                <FieldError id="email-error">{errors.email}</FieldError>
              </Field>

              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : "password-description"
                  }
                  required
                />
                {errors.password ? (
                  <FieldError id="password-error">{errors.password}</FieldError>
                ) : (
                  <FieldDescription id="password-description">
                    Must be at least 8 characters long.
                  </FieldDescription>
                )}
              </Field>

              <Field data-invalid={!!errors.role}>
                <FieldTitle id="account-label">Account Type</FieldTitle>

                <RadioGroup<UserRole>
                  className="grid grid-cols-3"
                  name="role"
                  value={formData.role}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      role: value,
                    }));

                    setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                  aria-labelledby="account-label"
                  aria-invalid={!!errors.role}
                  aria-describedby={errors.role ? "role-error" : undefined}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="seeker" id="r1" />
                    <Label htmlFor="r1">Seeker</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="recruiter" id="r2" />
                    <Label htmlFor="r2">Recruiter</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="admin" id="r3" />
                    <Label htmlFor="r3">Admin</Label>
                  </div>
                </RadioGroup>
                <FieldError id="role-error">{errors.role}</FieldError>
              </Field>

              <Field>
                <Button type="submit">Create Account</Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <SocialSignIn />

              <FieldDescription className="text-center">
                Already have an account? <Link href="/signin">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default SignUpForm;
