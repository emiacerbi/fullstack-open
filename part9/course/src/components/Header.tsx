type Props = {
  name: string;
};

const Header = ({ name }: Props) => {
  return (
    <header>
      <h1>{name}</h1>
    </header>
  );
};

export default Header;
