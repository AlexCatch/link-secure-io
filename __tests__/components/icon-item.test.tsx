import {cleanup, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import IconLink, {IconLinkIcon} from "../../components/icon-link";

describe('Icon Link', () => {
  it('renders correct icon', () => {
    render(<IconLink type={IconLinkIcon.github} link="https://github.com" />);
    expect(screen.getByTestId('github-svg')).toBeDefined();

    cleanup();

    render(<IconLink type={IconLinkIcon.linkedin} link="https://linkedin.com" />)
    expect(screen.getByTestId('linkedin-svg')).toBeDefined();
  });

  it('opens the correct link', () => {
    const { getByTestId } = render(<IconLink type={IconLinkIcon.github} link="https://github.com" />);
    expect(getByTestId('icon-link')).toHaveAttribute('href', 'https://github.com');
  });
})