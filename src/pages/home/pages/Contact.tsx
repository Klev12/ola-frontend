import MenuDemo from "../components/Menu";

export const Contact = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#333",
          padding: "10px 20px",
        }}
      >
        <MenuDemo />
      </div>
      <a href="https://www.instagram.com/olapublicidad.ec/" target=" ">
        <i className="pi pi-instagram"></i>
      </a>
      <a href="https://www.facebook.com/olapublicidad.ec" target=" ">
        <i className="pi pi-facebook"></i>
      </a>
      <a href="https://www.tiktok.com/@olapublicidad" target=" ">
        <i className="pi pi-tiktok"></i>
      </a>
    </div>
  );
};
