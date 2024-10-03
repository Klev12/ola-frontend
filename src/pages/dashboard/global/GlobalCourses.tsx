import ListElements from "./ListElements";

const GlobalCourses = () => {
  return (
    <div>
      <ListElements
        header={(element) => (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
              rounded
              icon={PrimeIcons.TIMES}
              onClick={() => {
                setSelectedItem(element);
                showDeleteMenu.setTrue();
              }}
            />
          </div>
        )}
        elements={[]}
        title={(regulation) => <></>}
        description={(regulation) => <></>}
        formTemplate={(regulation) => (
          <>
            {/* <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <InputText
                placeholder="Título"
                defaultValue={regulation?.title}
                name="title"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label htmlFor="">Título</label>
              <Editor
                placeholder="Descripción"
                name="description"
                value={regulation?.description}
                onTextChange={(e) => {
      
                }}
                style={{ height: "300px" }}
              />
            </div> */}
          </>
        )}
        onSubmit={(data, selectedItem) => {}}
      />
    </div>
  );
};

export default GlobalCourses;
