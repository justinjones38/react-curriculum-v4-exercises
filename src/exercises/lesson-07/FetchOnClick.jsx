import { useEffect, useState } from 'react';
import './Lesson07Styles.css';
import { getSinglePost } from './api';

export default function FetchOnClick() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const randomNum = Math.ceil(Math.random() * 100);

  const handleChange = async (num) => {
    console.log(num);
    setLoading(true);
    try {
      const apiData = await getSinglePost(num);
      setData(apiData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!data || Object.keys(data) === 0) {
    return;
  }

  console.log(data);

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={() => handleChange(randomNum)}>
        Get post
      </button>
      {loading ? (
        <h2>Loading </h2>
      ) : (
        <div className="content">
          {error ? (
            <h2>Cannot fetch data</h2>
          ) : (
            <div>
              <h2>{data.title}</h2>
              <p>{data.body}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
