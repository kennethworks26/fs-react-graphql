import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries";
import Select from "react-select";

const UpdateBirthyear = () => {
  const [name, setName] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState("");
  const [error, setError] = useState(null);
  const authors = useQuery(ALL_AUTHORS);

  const options = authors.data.allAuthors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const handleNameChange = (event) => {
    setName(event.value);
    setSelectedName({
      value: event.value,
      label: event.label,
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    console.log(`updating ${name} birthyear...`);

    editAuthor({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedName}
            onChange={handleNameChange}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(+target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateBirthyear;
