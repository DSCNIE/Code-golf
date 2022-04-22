import { Header } from "@mantine/core";
import styles from "../styles/navbar.module.scss";

const Navbar = (props) => {
  return (
    <Header height={60} p="xs">
      <span className={styles.title}>Code<span className={styles.flicker}>Golf</span></span>
    </Header>
  );
};

export default Navbar;
