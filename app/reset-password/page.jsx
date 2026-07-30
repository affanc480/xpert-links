'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AuthLayout,
  PasswordInput,
  PasswordStrength,
  getPasswordRules,
  AuthButton,
  SuccessAnimation,
} from '@/components/auth';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(() => router.push('/login'), 1800);
    return () => clearTimeout(timeout);
  }, [done, router]);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!getPasswordRules(form.password).every((r) => r.valid)) {
      nextErrors.password = 'Password does not meet all requirements';
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <AuthLayout title="Create New Password">
        <SuccessAnimation
          title="Password Updated Successfully"
          subtitle="Redirecting you to login…"
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Choose a strong password for your account."
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div>
          <PasswordInput
            id="password"
            name="password"
            label="New Password"
            placeholder="Enter new password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange('password')}
            error={errors.password}
          />
          <PasswordStrength password={form.password} />
        </div>

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter new password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
        />

        <AuthButton type="submit" loading={loading} className="mt-1">
          Update Password
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
