import { render, screen } from "@testing-library/react";
import Form from "./components/Form";
import userEvent from "@testing-library/user-event";

const name = "Demo User";
const expMonth = "12";
const expYear = "2025";

const validAmexCard = "371300031046123";
const validVisaCard = "4444444444444444";

describe("App", () => {
  test("renders form on load", () => {
    render(<Form />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Card Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVV2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Exp. Month")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Exp. Year")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  describe("when an American Express card is used", () => {
    test("and the details are correct, a success mesage appears", () => {
      render(<Form />);
      userEvent.type(screen.getByPlaceholderText("Name"), name);
      userEvent.type(screen.getByPlaceholderText("Exp. Month"), expMonth);
      userEvent.type(screen.getByPlaceholderText("Exp. Year"), expYear);

      userEvent.type(screen.getByPlaceholderText("Card Number"), validAmexCard);
      userEvent.type(screen.getByPlaceholderText("CVV2"), "1234");

      userEvent.click(screen.getByText("Submit"));

      expect(
        screen.getByText(/Your information has been processed/i)
      ).toBeInTheDocument();
    });

    test("and the card number is incorrect, an error appers", () => {
      render(<Form />);
      userEvent.type(screen.getByPlaceholderText("Name"), name);
      userEvent.type(screen.getByPlaceholderText("Exp. Month"), expMonth);
      userEvent.type(screen.getByPlaceholderText("Exp. Year"), expYear);

      userEvent.type(
        screen.getByPlaceholderText("Card Number"),
        "37138153104600"
      );
      userEvent.type(screen.getByPlaceholderText("CVV2"), "1234");

      userEvent.click(screen.getByText("Submit"));

      expect(
        screen.getByText("Please enter a valid card number")
      ).toBeInTheDocument();
      expect((screen.getByText("Submit") as HTMLButtonElement).disabled).toBe(
        true
      );
    });

    test("and the cvv2 number is not four digits, an error appers", () => {
      render(<Form />);
      userEvent.type(screen.getByPlaceholderText("Name"), name);
      userEvent.type(screen.getByPlaceholderText("Exp. Month"), "12");
      userEvent.type(screen.getByPlaceholderText("Exp. Year"), "2025");

      userEvent.type(screen.getByPlaceholderText("Card Number"), validAmexCard);
      userEvent.type(screen.getByPlaceholderText("CVV2"), "123");

      userEvent.click(screen.getByText("Submit"));

      expect(screen.getByText("Please enter a valid cvv2")).toBeInTheDocument();
      expect((screen.getByText("Submit") as HTMLButtonElement).disabled).toBe(
        true
      );
    });
  });

  describe("when a Visa card is used", () => {
    test("and the details are correct, a success mesage appears", () => {
      render(<Form />);
      userEvent.type(screen.getByPlaceholderText("Name"), name);
      userEvent.type(screen.getByPlaceholderText("Exp. Month"), expMonth);
      userEvent.type(screen.getByPlaceholderText("Exp. Year"), expYear);

      userEvent.type(screen.getByPlaceholderText("Card Number"), validVisaCard);
      userEvent.type(screen.getByPlaceholderText("CVV2"), "123");

      userEvent.click(screen.getByText("Submit"));

      expect(
        screen.getByText(/Your information has been processed/i)
      ).toBeInTheDocument();
    });

    test("and the card number is incorrect, an error appers", () => {
      render(<Form />);
      userEvent.type(screen.getByPlaceholderText("Name"), name);
      userEvent.type(screen.getByPlaceholderText("Exp. Month"), expMonth);
      userEvent.type(screen.getByPlaceholderText("Exp. Year"), expYear);

      userEvent.type(screen.getByPlaceholderText("Card Number"), "444444");
      userEvent.type(screen.getByPlaceholderText("CVV2"), "123");

      userEvent.click(screen.getByText("Submit"));

      expect(
        screen.getByText("Please enter a valid card number")
      ).toBeInTheDocument();
      expect((screen.getByText("Submit") as HTMLButtonElement).disabled).toBe(
        true
      );
    });

    test("and the cvv2 number is not three digits, an error appers", () => {
      render(<Form />);
      userEvent.type(screen.getByPlaceholderText("Name"), name);
      userEvent.type(screen.getByPlaceholderText("Exp. Month"), "12");
      userEvent.type(screen.getByPlaceholderText("Exp. Year"), "2025");

      userEvent.type(screen.getByPlaceholderText("Card Number"), validVisaCard);
      userEvent.type(screen.getByPlaceholderText("CVV2"), "12");

      userEvent.click(screen.getByText("Submit"));

      expect(screen.getByText("Please enter a valid cvv2")).toBeInTheDocument();
      expect((screen.getByText("Submit") as HTMLButtonElement).disabled).toBe(
        true
      );
    });
  });
});
