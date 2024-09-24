import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClient() {
  return typeof window !== 'undefined';
}

export const createRegistrationUrl = (redirectUri: string) => {
  const registrationEndpoint = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations`;
  const params = new URLSearchParams();
  params.set('client_id', process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '');
  params.set('redirect_uri', redirectUri);
  params.set('scope', 'openid profile email');
  params.set('response_type', 'code');
  params.set('response_mode', 'fragment');
  return `${registrationEndpoint}?${params.toString()}`;
};
