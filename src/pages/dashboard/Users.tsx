import { useMutation } from "react-query";
import { getAllUsers } from "../../services/user-service";

import UserCard from "./components/UserCard";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Users = () => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const {
    mutate: getAllUsersMutate,
    data: userData,
    isLoading: isLoadingUsers,
  } = useMutation(getAllUsers);

  useEffect(() => {
    getAllUsersMutate({ access: true, keyword });
  }, [keyword, getAllUsersMutate]);

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <form
        className="p-inputgroup flex-1"
        style={{ width: "30vw" }}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );
          setKeyword(formData["keyword"].toString());
        }}
      >
        <InputText placeholder="Nombre, código, email" name="keyword" />
        <Button icon="pi pi-search" />
      </form>
      {isLoadingUsers && <ProgressSpinner />}
      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {userData?.data.users.map((user, index) => {
          return (
            <div key={index}>
              <UserCard
                user={user}
                notificationMode={false}
                onSuccessEdit={() => {
                  getAllUsersMutate({ access: true, keyword });
                }}
              />
            </div>
          );
        })}
      </div>

      <Paginator
        first={currentPage}
        rows={10}
        totalRecords={userData?.data.count}
        onPageChange={(value) => {
          setCurrentPage(value.first);

          getAllUsersMutate({
            access: true,
            page: value.page + 1,
            limit: value.rows,
          });
        }}
      />
    </div>
  );
};

export default Users;
