import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Container from "./Container";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center gap-4">
          <p>Invoice App</p>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};
export default Header;
