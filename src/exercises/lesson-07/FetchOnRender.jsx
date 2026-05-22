import { getPosts } from './api';
import './Lesson07Styles.css';

export default function FetchOnRender() {
  const { data, error, loading } = getPosts();
  console.log(data);
  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      {loading ? (
        <h2>Loading </h2>
      ) : (
        <div className="content">
          {error ? (
            <h2>Cannot fetch data</h2>
          ) : (
            data.map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
