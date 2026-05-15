import { useState } from 'react';
import { getSinglePost } from './api';
import './Lesson07Styles.css';

export default function FetchOnClick() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const randomNum = Math.ceil(Math.random() * 100);

  const handleChange = async (num) => {
    setLoading(true);
    try {
      const resData = await getSinglePost(num);
      if (!resData) {
        throw new Error('Error receiving response data');
      }
      setData(resData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="root">
      <h1 className="heading">Fetch single post on click</h1>
      <button type="button" onClick={() => handleChange(randomNum)}>
        Get post
      </button>
      <div className="content">
        {error ? (
          <h2>Cannot fetch data </h2>
        ) : !loading ? (
          <div>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}
