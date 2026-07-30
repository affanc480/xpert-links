'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, ArrowRight } from 'lucide-react';
import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  PasswordStrength,
  getPasswordRules,
  AuthButton,
} from '@/components/auth';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address';
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
    router.push('/login');
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join Xpert Link and start transforming your business."
      footer={
        <p>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <AuthInput
          id="fullName"
          name="fullName"
          label="Full Name"
          icon={User}
          placeholder="Jordan Miller"
          autoComplete="name"
          value={form.fullName}
          onChange={handleChange('fullName')}
          error={errors.fullName}
        />

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={Mail}
          placeholder="you@company.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
        />

        <div>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Create a password"
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
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
        />

        <AuthButton type="submit" loading={loading} className="mt-1 group">
          Create Account
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
