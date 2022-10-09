import React, { useEffect, useState } from 'react';
import $ from 'jquery';

import ThreadCard from './ThreadCard';
// props are going to be the name of the user
function ThreadCardList(props) {

  // state
  const [error, setError] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [threadDatas, setThreadDatas] = useState([]);

  // hook (occurs after render)
  useEffect(() => {
    $.getJSON('api/user/' + props.username + '/collection')
    .done((json) => {
      // set the loaded and threadDatas state
      setThreadDatas(json);
      setLoaded(true);
      console.log(json);
    })
    .fail((jqxhr, textStatus, requestError) => {
      // set the loaded and error state
      setLoaded(false);
      setError(textStatus + ', ' + requestError);
      console.log(error);
    });
  }, []);

  // TODO if the user has no threads, display something to prompt them to add threads to their collection
  if (isLoaded) {
    const allThreads = threadDatas.map((thread) =>
      <ThreadCard thread_data={thread.thread_data} skeins_owned={thread.skeins_owned} />
    );

    return <div>{allThreads}</div>;
  }
  return <h1>Loading...</h1>;

}

export default ThreadCardList;