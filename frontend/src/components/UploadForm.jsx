import { useState } from "react";
import axios from "axios";
import React from "react";

function UploadForm() {

  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file || !email) {
      setMessage("Please select file and email");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {

      setLoading(true);

      const res =axios.post(
        import.meta.env.VITE_API_URL + "/api/upload",
        formData
        );

      setMessage("Summary generated and email sent!");

    } catch (error) {

      setMessage("Error processing file");

    }

    setLoading(false);
  };

  return (

    <div>

      <h2>Upload Sales File</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Generate Summary
        </button>

      </form>

      {loading && <p>Processing...</p>}
      {message && <p>{message}</p>}

    </div>

  );
}

export default UploadForm;