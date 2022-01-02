import React, {useCallback, useRef, useState} from "react";
import {render, screen} from "@testing-library/react";
import {expect} from "@jest/globals";

import useEncryption from "../../../lib/hooks/encryption/use-encryption";

const testID = {
  encryptButton: 'encryptButton',
  decryptButton: 'decryptButton',

  encryptedValue: 'encryptedValue',
  keyIv: 'keyIv',
  decryptedValue: 'decryptedValue',
};

const TestComponent = () => {
  const {encrypt, decrypt} = useEncryption();
  const [encryptedValue, setEncryptedValue] = useState<string | undefined>();
  const [keyIv, setKeyIv] = useState<string | undefined>();
  const [decryptedValue, setDecryptedValue] = useState<string | undefined>();

  const encryptData = useCallback(() => {
    const {keyIv, encryptedData} = encrypt("hello world");
    setEncryptedValue(encryptedData);
    setKeyIv(keyIv);
  }, [encrypt]);

  const decryptData = useCallback(() => {
    const decryptedValue = decrypt(keyIv, encryptedValue);
    setDecryptedValue(decryptedValue);
  }, [decrypt, encryptedValue, keyIv]);

  return (
    <div>
      <div>
        <div>
          <button data-testid={testID.encryptButton} onClick={encryptData}>
            encrypt
          </button>
          <button data-testid={testID.decryptButton} onClick={decryptData}>
            decrypt
          </button>
        </div>
      </div>
      <div>
        <p data-testid={testID.encryptedValue}>{encryptedValue}</p>
        <p data-testid={testID.keyIv}>{keyIv}</p>
        <p data-testid={testID.decryptedValue}>{decryptedValue}</p>
      </div>
    </div>
  );
}

describe('use-encryption', () => {
  it('correctly encrypts and decrypts text', () => {
    render(<TestComponent />);

    const encryptButton = screen.getByTestId(testID.encryptButton);
    const decryptButton = screen.getByTestId(testID.decryptButton);
    const encryptedValue = screen.getByTestId(testID.encryptedValue);
    const keyIv = screen.getByTestId(testID.keyIv);
    const decryptedValue = screen.getByTestId(testID.decryptedValue);

    encryptButton.click();

    expect(encryptedValue).toBeDefined();
    expect(keyIv).toBeDefined();

    decryptButton.click();

    expect(decryptedValue.textContent).toBe("hello world");
  });
});