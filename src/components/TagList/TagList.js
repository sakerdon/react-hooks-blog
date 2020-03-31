import React from 'react';

export default function Taglist(props) {
	return	(
		<div className="tag-list">
			{props.tagList.map( tag =>  {
				return <div className="tag-default tag-pill" key={ tag }>{ tag }</div>
			})}
		</div>
	)

}