'use client';

import NextError from 'next/error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
