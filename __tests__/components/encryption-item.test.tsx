import {cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import EncryptionItem, {EncryptionItemType} from "../../components/encryption-item";

describe('Encryption Item', () => {
  afterEach(cleanup);
  it('renders correct icon', () => {
    render(<EncryptionItem type={EncryptionItemType.file} />);
    expect(screen.getByTestId('file-svg')).toBeDefined();

    cleanup();

    render(<EncryptionItem type={EncryptionItemType.text} />);
    expect(screen.getByTestId('text-svg')).toBeDefined();
  });

  it('renders correct text', () => {
    render(<EncryptionItem type={EncryptionItemType.file} />);
    expect(screen.getByTestId("encryption-item-text")).toHaveTextContent("Encrypt a file");

    cleanup();

    render(<EncryptionItem type={EncryptionItemType.text} />);
    expect(screen.getByTestId("encryption-item-text")).toHaveTextContent("Encrypt some text")
  });
});