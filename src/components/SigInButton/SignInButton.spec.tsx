import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';
import { SigInButton } from '.';

jest.mock('next-auth/client');

describe('SigInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SigInButton />)
    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  });

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([{
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      expires: 'mock-expires'
    }, false]);
    render(<SigInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  });
});