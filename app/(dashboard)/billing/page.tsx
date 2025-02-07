"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./billing.module.css";

interface UserDetails {
  customerName: string;
  currentReading: string;
  previousReading: string;
}

export default function Billing() {
  const searchParams = useSearchParams();
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const calculateBill = () => {
      if (!searchParams) return;

      const customerName = searchParams.get("customerName");
      const currentReading = searchParams.get("currentReading");
      const previousReading = searchParams.get("previousReading");

      if (!customerName || !currentReading || !previousReading) {
        setErrorMessage("Missing billing information in URL.");
        setBillAmount(NaN);
        setUserDetails(null);
        return;
      }

      const current = Number(currentReading);
      const previous = Number(previousReading);

      if (isNaN(current) || isNaN(previous)) {
        setErrorMessage("Invalid reading values. Must be numbers.");
        setBillAmount(NaN);
        setUserDetails(null);
        return;
      }

      const usage = current - previous;
      const pricePerUnit = 5;
      const amount = usage * pricePerUnit;

      setBillAmount(amount);
      setUserDetails({ customerName, currentReading, previousReading });
      setErrorMessage(null);
    };

    calculateBill();
  }, [searchParams]);

  useEffect(() => {
    if (billAmount !== null) setIsLoading(false);
  }, [billAmount]);

  if (isLoading) return <div>Loading...</div>;

  if (errorMessage) return <div className="error">{errorMessage}</div>;

  if (!userDetails) return <div>No billing information available.</div>;

  return (
    <div className={styles.billingContainer}>
      {" "}
      <h1 className={styles.billingTitle}>Billing Information</h1>
      <h2 className={styles.customerName}>{userDetails.customerName}'s Bill</h2>
      <div className={styles.usageInfo}>
        <p>
          Usage:{" "}
          {Number(userDetails.currentReading) -
            Number(userDetails.previousReading)}{" "}
          units
        </p>
      </div>
      <div className={styles.amountDue}>
        <p>Total Amount Due: PHP {billAmount}</p>
      </div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}{" "}
    </div>
  );
}
