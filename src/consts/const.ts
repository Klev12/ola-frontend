export enum ResourceAssets {
  logo = "logo.png",
}

export enum ContractIds {
  userForm = 1,
  projectPolitics,
  projectHub,
  ola = 2,
}

export const ENV = {
  BACKEND_ROUTE: `http://localhost:8000/api/v1`,
  ASSETS_ROUTE(resource: ResourceAssets): string {
    return `${this.BACKEND_ROUTE}/assets/${resource}`;
  },
  PAYPHONE_ID: import.meta.env.VITE_PAYPHONE_ID,
  PAYPHONE_TOKEN: import.meta.env.VITE_PAYPHONE_TOKEN,
};
