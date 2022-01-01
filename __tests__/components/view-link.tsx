import {render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom';
import ViewLink from "../../components/view-link";
import {expect} from "@jest/globals";

window.prompt = jest.fn();

describe('View Link', () => {
  it('correctly renders tick icon on copy', () => {
    render(<ViewLink link={"https://github.com"} />);

    const copyButton = screen.getByTestId('copy-button');
    const copyIcon = screen.getByTestId('copy-icon');

    expect(copyIcon).toBeDefined();
    copyButton.click();

    const tickIcon = screen.getByTestId('tick-icon');
    expect(tickIcon).toBeDefined();
  });
})