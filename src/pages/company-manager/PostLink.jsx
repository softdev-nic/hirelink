import React from "react";
import API from "../../Services/API";
 
const PostLink = () => {
const [CompanyLead, setCompanyLead] = React.useState({
    companyName: "",
    email: "",
  });

  const handleChange = (e) => {
    setCompanyLead({ ...CompanyLead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.publicAPI.post("/add-company", CompanyLead);
      console.log("Response:", response.data);
      
    } catch (error) {
      console.error("Error submitting company lead:", error);
      
    }               
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Post a Job Link</h1>
      <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            placeholder="Enter company Name"
            name="companyName"
            value={CompanyLead.companyName}
            onChange={handleChange}
          />
        </div> 
        
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hireEmail"
          >
            Hiring Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hireEmail"
            type="email"
            placeholder="Enter hiring email"
            name="email"
            value={CompanyLead.email}
            onChange={handleChange} 
          />
         </div>
         <div className="submit">
           <button
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             type="submit" onClick={handleSubmit}
           >
             Submit
           </button>
         </div>
       </form> 
    </div>
  );
};

export default PostLink;           