import { useState, useEffect } from "react";
import Input from "./Input";
import { formatVisa, formatAmex } from "../utils/index";

function Form() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardError, setCardError] = useState("");
  const [cardType, setCardType] = useState<"Amex" | "Visa" | undefined>();
  const [cvv2, setCvv2] = useState("");
  const [cvv2Error, setCvv2Error] = useState("");
  const [month, setMonth] = useState("");
  const [monthError, setMonthError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [onSuccessfulSubmit, setOnSuccessfulSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!cardNumber || !cardType) {
      return;
    }

    if (cardType === "Visa") {
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        setCardError("Please enter a valid card number");
      }

      if (cardNumber.replace(/\s/g, "").length === 16) {
        setCardError("");
        if (cardNumber.length === 16) {
          setCardNumber(formatVisa(cardNumber));
        }
      }
    }

    if (cardType === "Amex") {
      if (cardNumber.replace(/\s/g, "").length !== 15) {
        setCardError("Please enter a valid card number");
      }

      if (cardNumber.replace(/\s/g, "").length === 15) {
        setCardError("");

        if (cardNumber.length === 15) {
          setCardNumber(formatAmex(cardNumber));
        }
      }
    }
  }, [cardNumber, cardType]);

  useEffect(() => {
    if (!cvv2 || !cardType) {
      return;
    }

    if (cardType === "Amex") {
      if (cvv2.length !== 4) {
        setCvv2Error("Please enter a valid cvv2");
      } else {
        setCvv2Error("");
      }
    } else if (cardType === "Visa") {
      if (cvv2.length !== 3) {
        setCvv2Error("Please enter a valid cvv2");
      } else {
        setCvv2Error("");
      }
    }
  }, [cvv2, cardType]);

  useEffect(() => {
    const possibleMonths = [
      "",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    if (possibleMonths.includes(month)) {
      setMonthError("");
    } else {
      setMonthError("Please enter a valid month");
    }
  }, [month]);

  useEffect(() => {
    const toNum = parseInt(year);

    if (toNum >= 2021 || year === "") {
      setYearError("");
    } else {
      setYearError("Please enter a valid year");
    }
  }, [year]);

  useEffect(() => {
    if (onSuccessfulSubmit) {
      setName("");
      setCardNumber("");
      setCvv2("");
      setMonth("");
      setYear("");

      setTimeout(() => setOnSuccessfulSubmit(false), 5000);
    }
  }, [onSuccessfulSubmit]);

  useEffect(() => {
    if (
      name === "" ||
      cardNumber === "" ||
      cardError !== "" ||
      cvv2 === "" ||
      cvv2Error !== "" ||
      month === "" ||
      monthError !== "" ||
      year === "" ||
      yearError !== ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    name,
    cardNumber,
    cardError,
    cvv2,
    cvv2Error,
    month,
    monthError,
    year,
    yearError,
  ]);

  const updateName = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };

  const updateCardNumber = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(value);

    if (value[0] === "4") {
      setCardType("Visa");
    } else if (value.slice(0, 2) === "34" || value.slice(0, 2) === "37") {
      setCardType("Amex");
    } else {
      setCardType(undefined);
      setCardError("Please enter a valid card number");
    }
  };

  const updateCvv2 = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCvv2(value);
  };

  const updateDate = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = value.match(/^\d+$/g)?.[0];

    if (normalizedValue && name === "month") {
      setMonth(normalizedValue.slice(0, 2));
    }

    if (normalizedValue && name === "year") {
      setYear(normalizedValue.slice(0, 4));
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!disabled) {
      setOnSuccessfulSubmit(true);
    }
  };

  return (
    <form className="form">
      {onSuccessfulSubmit && (
        <div role="alert" className="success-banner">
          Your information has been processed!
        </div>
      )}
      <p className="header">Enter your credit card information</p>
      <Input placeholder="Name" value={name} onChange={updateName} />

      <Input
        placeholder="Card Number"
        value={cardNumber}
        onChange={updateCardNumber}
        error={cardError === "" ? undefined : cardError}
      />
      <Input
        placeholder="CVV2"
        value={cvv2}
        onChange={updateCvv2}
        error={cvv2Error === "" ? undefined : cvv2Error}
      />

      <Input
        name="month"
        placeholder="Exp. Month"
        value={month}
        onChange={updateDate}
        error={monthError === "" ? undefined : monthError}
      />
      <Input
        name="year"
        placeholder="Exp. Year"
        value={year}
        onChange={updateDate}
        error={yearError === "" ? undefined : yearError}
      />

      <div className="cc-container" aria-hidden>
        <img
          className="cc-display"
          src="https://www.waveswifi.com/sites/default/files/visa-mastercard-amex_0.png"
          alt=""
        />
      </div>

      <button disabled={disabled} className="submit" onClick={handleClick}>
        Submit
      </button>
    </form>
  );
}

export default Form;
