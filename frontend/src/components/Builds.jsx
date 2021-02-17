import React, { Fragment, useEffect } from 'react';
import { fetchBuilds } from '../apis/builds'; 

export const Builds = () => {
  useEffect(() => {
    fetchBuilds()
    .then((data) =>
      console.log(data)
    )
  }, [])
  return (
    <Fragment>
      レンタルスペース一覧
    </Fragment>
  )
}
