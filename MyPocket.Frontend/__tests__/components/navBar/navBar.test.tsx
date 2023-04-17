import { Navbar } from '@/components';
import { UserProvider, useUser } from '@/components/contexts/userContext';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/navigation');

const NavBarProvider = () => {
  return (
    <UserProvider>
      <Navbar />
    </UserProvider>
  );
};
describe('navBar', () => {
  it('should render about, contact, signup and login links when no user provided', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: null }),
    }));
    render(<NavBarProvider />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(4);
    const aboutLink = screen.getByText('About');
    const contactLink = screen.getByText('Contact');
    const signUpLink = screen.getByText('Signup');
    const loginLink = screen.getByText('Login');
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
  it('should not render Dashboard, Transactions, Budgets, Accounts, Categories, Logout and Profile links when no user provided', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: null }),
    }));
    render(<NavBarProvider />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(4);
    const dashboardLink = screen.queryByText('Dashboard');
    const transactionsLink = screen.queryByText('Transactions');
    const budgetsLink = screen.queryByText('Budgets');
    const accountsLink = screen.queryByText('Accounts');
    const categoriesLink = screen.queryByText('Categories');
    const profileLink = screen.queryByText('Profile');
    const logoutLink = screen.queryByText('Logout');
    expect(dashboardLink).toBeNull();
    expect(transactionsLink).toBeNull();
    expect(budgetsLink).toBeNull();
    expect(accountsLink).toBeNull();
    expect(categoriesLink).toBeNull();
    expect(profileLink).toBeNull();
    expect(logoutLink).toBeNull();
  });
  it('should render Dashboard, Transactions, Budgets, Accounts, Categories, Logout and Profile links when user provided', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: { firstName: 'test', lastName: 'test', email: 'test@test.com' } }),
    }));
    render(<NavBarProvider />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(14);
    const dashboardLink = screen.getAllByText('Dashboard');
    const transactionsLink = screen.getAllByText('Transactions');
    const budgetsLink = screen.getAllByText('Budgets');
    const accountsLink = screen.getAllByText('Accounts');
    const categoriesLink = screen.getAllByText('Categories');
    const profileLink = screen.getAllByText('Hello, test!');
    const logoutLink = screen.getAllByText('Logout');
    expect(accountsLink.length).toBe(2);
    expect(transactionsLink.length).toBe(2);
    expect(budgetsLink.length).toBe(2);
    expect(categoriesLink.length).toBe(2);
    expect(logoutLink.length).toBe(2);
    expect(profileLink.length).toBe(2);
    expect(dashboardLink.length).toBe(2);
  });
  it('should not render about, contact, signup and login links when user provided', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: { firstName: 'test', lastName: 'test', email: 'test@test.com' } }),
    }));
    render(<NavBarProvider />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(14);
    const aboutLink = screen.queryByText('About');
    const contactLink = screen.queryByText('Contact');
    const signupLink = screen.queryByText('Signup');
    const loginLink = screen.queryByText('Login');
    expect(aboutLink).toBeNull();
    expect(contactLink).toBeNull();
    expect(signupLink).toBeNull();
    expect(loginLink).toBeNull();
  });
  it('should set class visible when click menu button', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: { firstName: 'test', lastName: 'test', email: 'test@test.com' } }),
    }));
    const { container } = render(<NavBarProvider />);
    const menuButton = container.getElementsByClassName('menuButton')[0];
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass('visible');
  });
  it('should not have class visible when click menu twice', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: { firstName: 'test', lastName: 'test', email: 'test@test.com' } }),
    }));
    const DivContainer = () => {
      return (
        <div>
          <NavBarProvider />
          <div data-testid="outside"></div>
        </div>
      );
    };

    const { container } = render(<DivContainer />);
    const menuButton = container.getElementsByClassName('menuButton')[0];
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass('visible');
    fireEvent.click(menuButton);
    expect(menuButton).not.toHaveClass('visible');
  });
  it('should not have class visible when click outside menu', () => {
    jest.mock('@/components/contexts/userContext', () => ({
      useUser: () => ({ user: { firstName: 'test', lastName: 'test', email: 'test@test.com' } }),
    }));
    const DivContainer = () => {
      return (
        <div>
          <NavBarProvider />
          <div data-testid="outside"></div>
        </div>
      );
    };
    const { container, debug } = render(<DivContainer />);
    const menuButton = container.getElementsByClassName('menuButton')[0];
    fireEvent.click(menuButton);
    expect(menuButton).toHaveClass('visible');
    const outsideContainer = screen.getByTestId('outside');
    expect(outsideContainer).toBeInTheDocument();

    fireEvent.click(outsideContainer);
    debug();
    expect(menuButton).not.toHaveClass('visible');
  });
});
