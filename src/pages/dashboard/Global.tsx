import { Outlet, useLocation, useNavigate } from "react-router";
import ROUTES from "../../consts/routes";
import { useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { ContractType } from "../../models/contract";
import { TermAndConditionsType } from "../../models/term-and-conditions";

const Global = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === ROUTES.DASHBOARD.GLOBAL) {
      navigate(ROUTES.DASHBOARD.GLOBAL_CONTRACTS);
    }
  }, [location, navigate]);

  const items: MenuItem[] = [
    {
      label: "Contratos",
      icon: "pi pi-box",
      style: { background: "red" },
      items: [
        {
          label: "Colaboradores",
          command: () => {
            navigate({
              pathname: ROUTES.DASHBOARD.GLOBAL_CONTRACTS,
              search: `?type=${ContractType.userForm}`,
            });
          },
        },
        {
          label: "Clientes",
          command: () => {
            navigate({
              pathname: ROUTES.DASHBOARD.GLOBAL_CONTRACTS,
              search: `?type=${ContractType.sales}`,
            });
          },
        },
      ],
    },
    {
      label: "Términos y Condiciones",
      icon: "pi pi-box",
      items: [
        {
          label: "Colaboradores",
          command: () => {
            navigate({
              pathname: ROUTES.DASHBOARD.GLOBAL_TERMS_AND_CONDITIONS,
              search: `?type=${TermAndConditionsType.userForm}`,
            });
          },
        },
        // {
        //   label: "Ventas",
        //   command: () => {
        //     navigate({
        //       pathname: ROUTES.DASHBOARD.GLOBAL_TERMS_AND_CONDITIONS,
        //       search: `?type=${TermAndConditionsType.salesForm}`,
        //     });
        //   },
        // },
      ],
    },
    {
      label: "Reglamento",
      icon: "pi pi-ethereum",

      command: () => {
        navigate(ROUTES.DASHBOARD.GLOBAL_REGULATION);
      },
    },
    {
      label: "HUB Capacitaciones",
      icon: "pi pi-pencil",
      command: () => {
        navigate(ROUTES.DASHBOARD.GLOBAL_COURSES);
      },
    },
    {
      label: "OLA Servicios",
      icon: "pi pi-plus",
      command: () => {
        navigate(ROUTES.DASHBOARD.GLOBAL_SERVICES);
      },
    },
  ];

  return (
    <>
      <Menubar
        style={{
          position: "fixed",
          background: "white",
          zIndex: 2,
          width: "70%",
        }}
        model={items}
      />

      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Global;
