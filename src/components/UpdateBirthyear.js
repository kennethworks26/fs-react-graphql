import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "./queries";

const UpdateBirthyear = () => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");
    const [error, setError] = useState(null);

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        },
    });

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
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
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
