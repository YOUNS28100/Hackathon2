import burgericon from "../../assets/burgermenu.png";
import crossicon from "../../assets/crossicon.png";

function CustomBurgerIcon() {
  return <img alt="icon" src={burgericon} width={65} />;
}

function CrossIcon() {
  return <img alt="icon" src={crossicon} width={65} height={65} />;
}
export { CustomBurgerIcon, CrossIcon };
