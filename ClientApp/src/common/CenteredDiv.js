import React from 'react';

export default (props) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }} className={props.className}>
            {props.children}
        </div>
    </div>
);
