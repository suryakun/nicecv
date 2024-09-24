import KeycloakAdminClient from 'keycloak-admin';
import { ConnectionConfig } from 'keycloak-admin/lib/client';

export class KeycloakAdmin {
  client: KeycloakAdminClient;
  constructor() {
    const config: ConnectionConfig = {
      baseUrl: process.env.KEYCLOAK_BASE_URL,
      realmName: process.env.KEYCLOAK_REALM,
    };
    this.client = new KeycloakAdminClient(config);
  }
}
