import KCAdminClient from '@keycloak/keycloak-admin-client';
import { ConnectionConfig } from '@keycloak/keycloak-admin-client/lib/client';

export class KeycloakAdmin {
  private static instance: KeycloakAdmin;
  client: KCAdminClient;

  constructor() {
    const config: ConnectionConfig = {
      baseUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
      realmName: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    };
    this.client = new KCAdminClient(config);
  }

  static getInstance() {
    if (!KeycloakAdmin.instance) {
      KeycloakAdmin.instance = new KeycloakAdmin();
    }
    return KeycloakAdmin.instance;
  }

  async authenticate() {
    await this.client.auth({
      clientId: 'admin-cli',
      username: 'admin@nicecv.ai',
      password: 'testing',
      grantType: 'password',
    });
  }

  async getUserByUsername(username: string) {
    return this.client.users.find({
      username,
    });
  }
}
