import Link from "next/link";
import styles from "../styles/shortcuts.module.css";

export default function Shortcuts() {
  return (
    <div className={styles.shortcuts}>
      <Link href="/WorkOrder">
        <button className={styles.buttons}>New Workorder</button>
      </Link>
      <Link href="/WorkOrderList">
        <button className={styles.buttons}>Submissions</button>
      </Link>
    </div>
  );
}
