import { TextInput } from "@mantine/core"
import * as React from "react";


export const searchBar = () => {
  const [search, setSearch] = React.useState("");

    return(
        <TextInput
        placeholder="Búsqueda"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    )
}


