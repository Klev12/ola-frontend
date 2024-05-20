import { Avatar } from "primereact/avatar";

export default function AvatarDemo() {
  return (
    <div className="card">
      <div className="flex flex-wrap gap-5">
        <div className="flex-auto">
          <Avatar
            icon="pi pi-user"
            className="mr-2"
            size="normal"
            shape="circle"
          />
        </div>
      </div>
    </div>
  );
}
