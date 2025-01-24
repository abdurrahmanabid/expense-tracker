import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Lottie from "react-lottie";

const CommonForm = ({
  formTitle,
  fields,
  onSubmit,
  lottieOptions,
  defaultWidth = "w-full", // Default width if not provided
  defaultValues = [], // Default values (optional)
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = fields.reduce((acc, field) => {
      const defaultValue =
        defaultValues?.find((item) => item.name === field.name)?.defaultValue ||
        "";

      if (field.type === "checkbox") {
        return { ...acc, [field.name]: defaultValue || false };
      }
      if (field.type === "radio" || field.type === "select") {
        return {
          ...acc,
          [field.name]: defaultValue || field.options?.[0] || "",
        };
      }
      return { ...acc, [field.name]: defaultValue };
    }, {});
    return initialData;
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({}); // Track visibility state for password fields

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error when the user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        formErrors[field.name] = `${field.label || field.name} is required!`;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    onSubmit(formData);
  };

  const togglePasswordVisibility = (name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center `}
    >
      <div
        className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg flex max-w-4xl overflow-hidden ${defaultWidth}`}
      >
        {lottieOptions && (
          <div
            className={`hidden md:flex items-center justify-center w-1/2 bg-blue-50 dark:bg-gray-700`}
          >
            <Lottie options={lottieOptions} height={400} width={400} />
          </div>
        )}

        <div className={`w-full ${lottieOptions ? "md:w-1/2" : "w-full"} p-8`}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            {formTitle}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            {fields.map((field) => {
              const fieldWidth = field.width || "w-full";

              return (
                <div className={`mb-4 ${fieldWidth}`} key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    {field.label || field.name}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder || ""}
                      className={`w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 ${
                        errors[field.name]
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500 dark:focus:ring-blue-400"
                      }`}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className={`w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 ${
                        errors[field.name]
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500 dark:focus:ring-blue-400"
                      }`}
                    >
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "radio" ? (
                    <div className="mt-2">
                      {field.options?.map((option) => (
                        <label
                          key={option}
                          className="inline-flex items-center mr-4 text-gray-600 dark:text-gray-300"
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={option}
                            checked={formData[field.name] === option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : field.type === "checkbox" ? (
                    <div className="mt-2">
                      <label className="inline-flex items-center text-gray-600 dark:text-gray-300">
                        <input
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          checked={formData[field.name]}
                          onChange={handleChange}
                          className="mr-2 rounded text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {field.label}
                      </label>
                    </div>
                  ) : field.type === "password" ? (
                    <div className="relative">
                      <input
                        type={showPassword[field.name] ? "text" : "password"}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder || ""}
                        className={`w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 ${
                          errors[field.name]
                            ? "border-red-500 focus:ring-red-500"
                            : "focus:ring-blue-500 dark:focus:ring-blue-400"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.name)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300 focus:outline-none"
                      >
                        {showPassword[field.name] ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <input
                      type={field.type || "text"}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder || ""}
                      className={`w-full mt-2 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 ${
                        errors[field.name]
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-blue-500 dark:focus:ring-blue-400"
                      }`}
                    />
                  )}

                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
