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
    $.getJSON(`../api/users/${props.user_id}/collection`)
    .done((json) => {
      // set the loaded and threadDatas state
      setThreadDatas(json);
      setLoaded(true);
    })
    .fail((jqxhr, textStatus, requestError) => {
      // set the loaded and error state
      // TODO make it display something other than "loading" if it errors. prompt them to reload or something.
      setLoaded(false);
      setError(textStatus + ', ' + requestError);
      console.log(error);
    });
  }, []);

  // TODO if the user has no threads, display something to prompt them to add threads to their collection
  if (isLoaded) {
    const allThreads = threadDatas.sort((a, b) => {
      if (b.thread_data.brand.name === a.thread_data.brand.name) {
        return parseInt(a.thread_data.brand_number) - parseInt(b.thread_data.brand_number);
      }
      return b.thread_data.brand.name - a.thread_data.brand.name;
    }).map((thread) =>
      <ThreadCard thread_data={thread.thread_data} skeins_owned={thread.skeins_owned} pk={thread.id} />
    );

    return <div className='list-group list-group-flush'>{allThreads}</div>;
  }
  return <h1>Loading...</h1>; // TODO make this more attractive

}

export default ThreadCardList;