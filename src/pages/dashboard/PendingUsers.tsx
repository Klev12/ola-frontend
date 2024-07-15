import { useMutation, useQuery } from "react-query";
import {
  deleteUserById,
  getAllUsers,
  toggleAccessUser,
} from "../../services/user-service";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const PendingUsers = () => {
  const { data, refetch } = useQuery({
    queryFn: () => getAllUsers(false),
    queryKey: ["peding-users"],
    refetchOnMount: true,
    refetchInterval: 20000,
  });

  const { mutate: toggleAccessUserMutate } = useMutation(
    ({ access, userId }: { access: boolean; userId: number }) =>
      toggleAccessUser(access, userId),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deleteUserByIdMutate } = useMutation(deleteUserById, {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div>
      <button onClick={() => refetch()}>recargar</button>
      {data?.data.users.map((user, index) => {
        return (
          <Card
            title={`Nuevo usuario ${user.fullname} ${user.email}`}
            key={index}
          >
            <Button
              label="Aceptar"
              onClick={() => {
                toggleAccessUserMutate({
                  access: true,
                  userId: user.id as number,
                });
              }}
            />
            <Button
              label="Denegar acceso"
              onClick={() => {
                deleteUserByIdMutate(user.id);
              }}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default PendingUsers;
