import React from 'react';

import ThreadCard from './ThreadCard';
import LoadingThreadCard from './LoadingThreadCard';

// props are going to be the name of the user
function ThreadCardList(props) {

  // TODO if the user has no threads, display something to prompt them to add threads to their collection
  if (props.isLoaded) {
    const allThreads = props.threadColors.sort((a, b) => {
      if (b.brand.name === a.brand.name) {
        return parseInt(a.brand_number) - parseInt(b.brand_number);
      }
      return a.brand.name.localeCompare(b.brand.name);
    });

    const threadCards = allThreads.map((thread) =>
      <ThreadCard thread_color={thread} />
    );

    return <div className='list-group list-group-flush'>{threadCards}</div>;
  }
  return <>
    <LoadingThreadCard headingWidth='40%'/>
    <LoadingThreadCard headingWidth='60%'/>
    <LoadingThreadCard headingWidth='50%'/>
  </>

}

export default ThreadCardList;