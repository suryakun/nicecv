import { DefaultUser, NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider, {
  KeycloakProfile,
} from 'next-auth/providers/keycloak';
import { OAuthConfig } from 'next-auth/providers/oauth';
import axios from 'axios';

declare module 'next-auth' {
  interface Session {
    profile: unknown;
    accessToken?: string;
    user: User;
  }

  interface User extends DefaultUser {
    id?: string;
  }
}

const isTokenExpired = (token: string) => {
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.exp < Date.now() / 1000;
  } catch (err) {
    console.error('Failed to decode token', err);
    return false;
  }
};

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || '',
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.profile = token.profile;
      if (session?.user) {
        session.user.id = token.sub;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.id_token = account.id_token;
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      if (account?.refresh_token) {
        token.refreshToken = account.refresh_token;
      }
      if (profile) {
        token.profile = profile;
      }

      // If the access token has expired
      if (isTokenExpired(token.accessToken as string)) {
        const response = await axios({
          method: 'post',
          url: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
          data: {
            client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.data?.access_token) {
          token.accessToken = response.data.access_token;
          token.refreshToken = response.data.refresh_token;
          token.expires_at = Date.now() + response.data.expires_in * 1000;
        }
      }
      return token;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token.provider === 'keycloak') {
        const issuerUrl = (
          authOptions.providers.find(
            (p) => p.id === 'keycloak',
          ) as OAuthConfig<KeycloakProfile>
        ).options!.issuer!;
        const logOutUrl = new URL(
          `${issuerUrl}/protocol/openid-connect/logout`,
        );
        logOutUrl.searchParams.set('id_token_hint', String(token.id_token!));
        await fetch(logOutUrl);
      }
    },
  },
};
