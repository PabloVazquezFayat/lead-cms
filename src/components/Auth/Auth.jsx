import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Auth(props) {
  return <div>{props.auth ? props.children : <Redirect to="/cms" />}</div>;
}
