import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEntries, addEntry } from "../../api/entries";
import "../../styles/Home.scss";
import { logout } from "../../api/auth";
import type {
  ITransaction,
  TTransactionType,
} from "../../interfaces/transaction";
import ListItem from "./ListItem";

export default function Home() {
  const [amount, setAmount] = useState<number>(0);
  const [transactionType, setTransactionType] =
    useState<TTransactionType>("WIN");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const [sortedTransactions, setSortedTransactions] = useState<
    Record<string, ITransaction[]>
  >({});
  const totalSum = transactions?.reduce(
    (acc, curr) =>
      curr.transactionType === "LOSE"
        ? (acc -= curr.amount)
        : (acc += curr.amount),
    0
  );

  useEffect(() => {
    onTransactionsUpdate();
  }, []);

  const onTransactionsUpdate = async () => {
    const data = await fetchEntries();
    const filtered = filterLast12Months(data.list);
    const grouped = groupByMonth(filtered);
    setTransactions(data.list);
    setSortedTransactions(grouped);
  };

  const filterLast12Months = (transactions: ITransaction[]) => {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    return transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      return txDate >= oneYearAgo && txDate <= now;
    });
  };

  const groupByMonth = (transactions: ITransaction[]) => {
    return transactions.reduce((acc: Record<string, ITransaction[]>, tx) => {
      const date = new Date(tx.createdAt);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`; // "2025-06"

      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(tx);
      return acc;
    }, {});
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 0) {
      alert("number must be 0 and above");
      return;
    }
    try {
      await addEntry({ amount, transactionType });
      await onTransactionsUpdate();
    } catch (err) {
      alert("שגיאה בהוספת סכום");
    }
  };

  return (
    <div className="home-container">
      <h2>ברוך הבא</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="הכנס סכום"
        />
        <select
          name="dropdown"
          id="dropdown"
          onChange={(e) =>
            setTransactionType(e.target.value as TTransactionType)
          }
        >
          <option value="WIN">Win</option>
          <option value="LOSE">Lose</option>
        </select>
        <button type="submit">הוסף</button>
      </form>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      {transactions && (
        <div className="list-container">
          <div className="total-sum" style={{color: totalSum && totalSum >= 0 ? "green" : "red"}}>{`Total Sum: ${totalSum}`}</div>
          <ul className="list">
            {Object.entries(sortedTransactions).map(
              ([date, transactionsList], index) => (
                <ListItem
                  key={index}
                  date={date}
                  transactionsList={transactionsList}
                />
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
