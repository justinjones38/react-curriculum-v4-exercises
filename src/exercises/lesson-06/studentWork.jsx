import { useEffect, useState } from 'react';
import PrimaryButton from './components/buttons/PrimaryButton';
import TaskItem from './components/features/TaskItem';
import { filterTasks } from './utils/utils';
import useTimeout from './hooks/useTimeout';

export default function StudentWork() {
  const [filter, setFilter] = useState('all');
  const { tasks, loading } = useTimeout();

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (!tasks) {
    return;
  }

  // #2: Filtering logic inside component
  let visibleTasks = filterTasks(tasks, filter);

  return (
    <div>
      {/* #3: Hardcoded UI, not reusable */}
      <h2>Welcome, Student</h2>

      {/* #4: Repeated button JSX */}
      <div>
        <PrimaryButton onClick={() => setFilter('all')}>All</PrimaryButton>
        <PrimaryButton onClick={() => setFilter('completed')}>
          Completed
        </PrimaryButton>
        <PrimaryButton onClick={() => setFilter('pending')}>
          Pending
        </PrimaryButton>
        <p>Current filter: {filter}</p>
      </div>

      {/* #5: Inline list rendering */}
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
