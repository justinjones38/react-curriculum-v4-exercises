import './Lesson07Styles.css';
import { getPosts } from './api';
export default function FetchOnRender() {
  const { data, error, loading } = getPosts();

  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      <div className="content">
        {loading ? <h2>Loading</h2> : null}
        {error ? <h2>Cannot fetch data </h2> : null}
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
