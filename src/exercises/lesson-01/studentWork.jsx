//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Justin';
  const age = 27;
  const hobbies = [
    'Coding',
    'Gaming',
    'Watching Sports',
    'Exercising',
    'Shopping',
  ];
  return (
    <div>
      <h1>
        {name}: {age}
      </h1>
      <p>
        I am a chemical engineering and criminal justice graduate who have been
        transitioning to a career in tech. I have been coding seriously for a
        little over a year now. I am happy to be in this class now
      </p>
      <ul>
        {hobbies.map((hobby) => (
          <li>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
