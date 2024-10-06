'use client';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SelectError = () => {
  const searchParams = useSearchParams();
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const error = searchParams.get('error');

  useEffect(() => {
    if (error === 'file-size') {
      setErrMessage('The file size exceeds the maximum allowed size of 1MB');
    }
    if (error === 'token-count') {
      setErrMessage(
        'You have reached the maximum number of tokens allowed for this template.',
      );
    }
  }, [error]);

  if (error === null || error !== 'token-count') {
    return null;
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Uh oh, Something happen</AlertTitle>
      <AlertDescription>{errMessage}</AlertDescription>
    </Alert>
  );
};
