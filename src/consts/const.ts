export enum ResourceAssets {
  logo = "logo.png",
  logoHub = "logo-hub.png",
}

export enum ContractIds {
  userForm = 1,
  projectPolitics,
  projectHub,
  ola = 2,
}

export const ENV = {
  BACKEND_ROUTE: import.meta.env.VITE_BACKEND_HOST,
  ASSETS_ROUTE(resource: ResourceAssets): string {
    return `${this.BACKEND_ROUTE}/assets/${resource}`;
  },
  PAYPHONE_ID: import.meta.env.VITE_PAYPHONE_ID,
  PAYPHONE_TOKEN: import.meta.env.VITE_PAYPHONE_TOKEN,
};
