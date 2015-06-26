// import React from 'react';
// import { Route } from 'react-router';
// /* import asyncLoader from './async-loader'; */

// import TodoApp from './components/TodoApp.react';
// /* import Github from 'bundle?lazy&name=github!./components/Github';
//    import Userpage from 'bundle?lazy&name=userpage!./components/Userpage';
//  */
// export default (
//   // 定义一个url路由表，App是一个入口
//   <Route name='TodoApp' path='/' handler={ TodoApp }>
//   /* <Route name='github' path='/github' handler={asyncLoader(Github)}>
//      <Route name='githubUser' path='/github/:login' handler={asyncLoader(Userpage)}/> */
//     <Route name='github' path='/github' handler={Github}/>
//     <Route name='githubUser' path='/github/:login' handler={Userpage}/>
//   </Route>
// );

import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import App from './App';
import TodoApp from './pages/TodoApp';
import Github from './pages/Github';
import UserPage from './pages/UserPage';

export default (
  // 定义一个url路由表，App是一个入口
   // <Route name='explore'  handler={TodoApp}>
   //  <Route name='github' path='github' handler={Github}>
   //      <Route name='github' path=':query' handler={hnQuery}/>
   //  <Route/>
   //  </Route>
    <Route path='/' name='routes app' handler={ App }>
      <Route name='todo' path="/todo" handler={ TodoApp } />
      <Route name='github' path="/github" handler={ Github } />
      <Route name='user' path="/github/:username" handler={ UserPage } />
    </Route>
);
