import React from 'react'

export default function EachVideo  (props)  {
  return (
      <div className='text-center h-96 mb-10'>
        <iframe src={props.items.url} controls width="350px" height="300px" className="rounded-md border border-black" />
        <h1 className="text-2xl font-semibold w-80">{props.items.title}</h1><br/>
      </div>
  )
};