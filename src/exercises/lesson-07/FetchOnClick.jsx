import './Lesson07Styles.css';
import { getSinglePost } from './api';
import { useState } from 'react';

export default function FetchOnClick() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const randNum = Math.ceil(Math.random() * 100);
      const info = await getSinglePost(randNum);
      if (!info) {
        throw new Error('Data cannot be fetched');
      }
      setData(info);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={fetchData}>
        Get post
      </button>
      {!error ? (
        <div className="content">
          {!loading ? (
            <>
              <h2>{data.title}</h2>
              <p>{data.body}</p>
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      ) : (
        <h2>Cannot fetch data</h2>
      )}
    </div>
  );
}
