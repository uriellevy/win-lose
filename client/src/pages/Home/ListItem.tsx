interface LIstItemProps {
  date: string;
  transactionsList: any;
}
const ListItem = ({ date, transactionsList }: LIstItemProps) => {
  const listItemSum = transactionsList.reduce((acc: any, curr: any) => curr.transactionType === "LOSE" ? acc-= curr.amount : acc+= curr.amount ,0);

  return (
    <li className="months-container">
      <div className="right">
        <div className="date">{date}</div>
        {transactionsList.map((transaction: any) => (
          <div
            key={transaction._id}
            className="item"
            style={{
              color: transaction.transactionType === "WIN" || transaction.amount === 0 ? "green" : "red",
            }}
          >
            {transaction.amount}
          </div>
        ))}
      </div>

      <div className="left" style={{color: listItemSum >= 0 ? "green" : "red"}} >{listItemSum}</div>
    </li>
  );
};

export default ListItem;
