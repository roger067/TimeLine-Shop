import React from 'react';
import HeaderCard from './HeaderCard';
import BodyCard from './BodyCard';

const TimeLine = (props) => {
    const renderedList = props.data.map((data) => {
        return (
            <li>
                <div className="timeline-badge"><img src="icons/check.svg" alt="check"/></div>
                <div className="timeline-panel">
                    <HeaderCard data={data} />
                    <BodyCard data={data} />
                </div>
            </li>

        );
    });
    return <ul className="timeline">{renderedList}</ul>
}

export default TimeLine;