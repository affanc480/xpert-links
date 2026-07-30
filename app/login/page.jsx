'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight } from 'lucide-react';
import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  AuthButton,
  Divider,
  SocialLogin,
} from '@/components/auth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address';
    if (!form.password) nextErrors.password = 'Password is required';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    // Simulate authentication request
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    router.push('/');
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your Xpert Link dashboard."
      footer={
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Create Account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

        <PasswordInput
          id="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange('password')}
          error={errors.password}
        />

        <div className="flex items-center justify-between -mt-1">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 dark:border-white/20 text-blue-600 focus:ring-blue-500/40"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthButton type="submit" loading={loading} className="mt-1 group">
          Continue
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </AuthButton>
      </form>

      <Divider />

      <SocialLogin providers={['google', 'microsoft']} />
    </AuthLayout>
  );
}
