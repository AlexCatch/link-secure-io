import React, {useCallback, useState} from "react";
import {cleanup, render, screen} from "@testing-library/react";
import {expect} from "@jest/globals";
import useHMAC from "../../../lib/encryption/use-hmac";

const testID = {
  generateHMACButton: 'generateHMACButton',
  validateHMACButton: 'validateHMACButton',

  hmacSignature: 'hmacSignature',
  isValid: 'isValid',
};

const TestComponent = () => {
  const {generateHMAC, validateHMAC} = useHMAC();
  const [hmacValue, setHMACValue] = useState<string | undefined>();
  const [isValidHMAC, setIsValidHMAC] = useState<string | undefined>();

  const generateHMACSignature = useCallback(() => {
    const hmacSig = generateHMAC("text", "hello-world");
    setHMACValue(hmacSig);
  }, [generateHMAC]);

  const validateHMACSignature = useCallback(() => {
    const isValid = validateHMAC(hmacValue, "text", "hello-world");
    setIsValidHMAC(isValid ? "valid" : "invalid");
  }, [hmacValue, validateHMAC]);

  return (
    <div>
      <div>
        <div>
          <button data-testid={testID.generateHMACButton} onClick={generateHMACSignature}>
            encrypt
          </button>
          <button data-testid={testID.validateHMACButton} onClick={validateHMACSignature}>
            decrypt
          </button>
        </div>
      </div>
      <div>
        <p data-testid={testID.hmacSignature}>{hmacValue}</p>
        <p data-testid={testID.isValid}>{isValidHMAC}</p>
      </div>
    </div>
  );
}

describe('use-hmac', () => {
  beforeEach(() => {
    cleanup();
  });

  it('correctly generates a HMAC signature', () => {
    render(<TestComponent />);

    const generateHMACButton = screen.getByTestId(testID.generateHMACButton);
    const hmacSignature = screen.getByTestId(testID.hmacSignature);

    generateHMACButton.click();
    expect(hmacSignature.textContent).toBe("b35ada367111a8b1b6326e5ca6f8f7d28c9540c495d09928f4499bd1ab981178");
  });

  it('correctly validates a HMAC signature', () => {
    render(<TestComponent />);

    const generateHMACButton = screen.getByTestId(testID.generateHMACButton);
    const validateHMACButton = screen.getByTestId(testID.validateHMACButton);
    const isValid = screen.getByTestId(testID.isValid);

    generateHMACButton.click();
    validateHMACButton.click();
    expect(isValid.textContent).toBe("valid");
  });
});