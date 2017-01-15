export default ( dispatcher, actionType ) => function Action ( payload, context ) {
  dispatcher.dispatch({
    actionType,
    payload,
    context,
  });  

  // so we have something to return in a promise
  return true;
};

