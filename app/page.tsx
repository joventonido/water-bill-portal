"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  customerName: string;
  currentReading: number;
  previousReading: number;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // const [userDetails, setUserDetails] = useState<FormData | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setUserDetails(data);
    router.push(
      `/billing?customerName=${data.customerName}&currentReading=${data.currentReading}&previousReading=${data.previousReading}`
    );
  };

  return (
    <div className="container">
      <h1 className="header">Water Billing Portal</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="label" htmlFor="customerName">
            Customer Name: <span className="required">*</span>{" "}
          </label>
          <input
            className="input"
            id="customerName"
            {...register("customerName", {
              required: "Customer name is required",
            })}
            placeholder="Enter your name"
          />
          {errors.customerName && (
            <p className="error">{errors.customerName.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="label" htmlFor="currentReading">
            Water Meter Reading (Current): <span className="required">*</span>
          </label>
          <input
            className="input"
            id="currentReading"
            {...register("currentReading", {
              required: "Current reading is required",
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || "Must be a valid number",
            })}
            placeholder="Enter current meter reading"
            type="number"
          />
          {errors.currentReading && (
            <p className="error">{errors.currentReading.message}</p>
          )}
        </div>
        <div className="form-group">
          <label className="label" htmlFor="previousReading">
            Water Meter Reading (Previous): <span className="required">*</span>
          </label>
          <input
            className="input"
            id="previousReading"
            {...register("previousReading", {
              required: "Previous reading is required",
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || "Must be a valid number",
            })}
            placeholder="Enter previous meter reading"
            type="number"
          />
          {errors.previousReading && (
            <p className="error">{errors.previousReading.message}</p>
          )}
        </div>
        <button type="submit" className="button">
          Calculate Bill
        </button>
      </form>
    </div>
  );
}
