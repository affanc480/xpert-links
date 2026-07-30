'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AuthLayout, OTPInput, AuthButton } from '@/components/auth';

const RESEND_SECONDS = 30;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [key, setKey] = useState(0); // remounts OTPInput on resend

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const formattedTime = `00:${String(seconds).padStart(2, '0')}`;

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    setCode('');
    setError('');
    setKey((k) => k + 1);
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (code.length !== 6) {
      setError('Enter the 6-digit code we sent you');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    router.push('/reset-password');
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="We've sent a 6-digit verification code to your email."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      }
    >
      <form onSubmit={handleVerify} className="flex flex-col items-center gap-6">
        <OTPInput key={key} length={6} onComplete={setCode} error={error} />

        <div className="flex items-center gap-3 text-sm">
          <span className="font-space font-semibold tabular-nums text-gray-700 dark:text-gray-300">
            {formattedTime}
          </span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={seconds > 0}
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline disabled:text-gray-400 dark:disabled:text-gray-600 disabled:no-underline disabled:cursor-not-allowed transition-colors"
          >
            Resend Code
          </button>
        </div>

        <AuthButton type="submit" loading={loading} className="w-full">
          Verify Code
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
