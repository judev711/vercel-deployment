import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/Register", values)
      .then((res) => {
        console.log("Response:", res.data); // Pour déboguer
        if (res.data.status == "Succes !") {
          navigate("/Login");
        } else {
          alert("Error in navigation");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error with your request."); // Alerte en cas d'erreur
      });
  };
  return (
    <div className=" max-sm:text-xs w-screen max-w-xs: h-screen bg-emerald-500 fixed">
      <div className="max-md:text-xs max-sm:w-[800px] max-sm:py-20 mx-auto flex justify-center p-20">
        <div className="bg-white w-1/3 p-5 rounded-md">
          <h1 className=" max-sm:text-xs font-bold text-2xl mb-3">Sign-Up </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 flex flex-col">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                id="name" // Ajout d'un id pour le label
                className="p-3 hover:bg-slate-300 rounded-md transition-all duration-300"
                type="text"
                placeholder="Enter your Name..."
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </div>
            {/* Enter your email */}
            <div className="mb-3 flex flex-col">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                id="email" // Ajout d'un id pour le label
                className="p-3 hover:bg-slate-300 rounded-md transition-all duration-300"
                type="email" // Changement du type à "email" pour validation automatique
                placeholder="Enter your Email..."
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            {/* Enter your Password */}
            <div className="mb-3 flex flex-col">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                id="password" // Ajout d'un id pour le label
                className="p-3 hover:bg-slate-300 rounded-md transition-all duration-300"
                type="password"
                placeholder="Enter your password..."
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            {/* Sign Up */}
            <div className="mb-4">
              <button
                type="submit"
                className="bg-emerald-500 text-white text-xl w-full p-3 font-bold rounded-md hover:bg-yellow-200 hover:text-black max-sm:text-[10px]
                max-sm:p-1"
              >
                Sign Up
              </button>
              <p className="text-xs font-semibold text-center">
                You agree to our terms and policies.
              </p>
            </div>
            <Link to="/">
              <button
                type="button"
                className="bg-gray-600 w-full text-white text-xl font-bold p-2 rounded-md hover:bg-amber-200 max-sm:text-xs max-sm:p-2"
              >
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
