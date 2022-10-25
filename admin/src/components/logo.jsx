export const Logo = ({ dark }) => (
  <div className="logo">
    <img src={`/images/${!dark ? "logo" : "logo-dark"}.svg`} alt="Emilus" width={100} height={70} />
  </div>
);
