import { useEffect, useState } from 'react';
import './Lesson07Styles.css';
import { getPosts } from './api';

export default function FetchOnRender() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await getPosts();
        if (!info) {
          throw new Error('Cannot fetch data');
        }
        setData(info);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="root">
      <h1 className="heading">Fetch list of posts on render</h1>
      {!error ? (
        <div className="content">
          {!loading ? (
            data.map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </div>
            ))
          ) : (
            <h2>Loading</h2>
          )}
        </div>
      ) : (
        <h2>Cannot fetch data</h2>
      )}
    </div>
  );
}
