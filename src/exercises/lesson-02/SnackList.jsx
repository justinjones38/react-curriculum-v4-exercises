export default function SnackList() {
  const snackRankings = [
    {
      name: 'Chips',
      rank: 5,
    },
    {
      name: 'Cake',
      rank: 4,
    },
    {
      name: 'Ice Cream',
      rank: 3,
    },
    {
      name: 'Fris',
      rank: 2,
    },
    {
      name: 'Cookies',
      rank: 1,
    },
  ];

  const orderedSnackRankings = snackRankings.toSorted(
    (itemA, itemB) => itemA.rank - itemB.rank
  );
  return (
    <ol className="snack-list">
      {orderedSnackRankings.map((snack) => (
        <li key={snack.rank}>{snack.name}</li>
      ))}
    </ol>
  );
}
