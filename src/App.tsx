import React from 'react';
import SideBar from './components/SideBar';
import ChatSection from './components/ChatSection';
import './App.css';

const App: React.FC = () => {
return(<main className='main-container'>
  <aside>
    <SideBar message={''} />
  </aside>
  <section className="col-span-2"> <ChatSection message={''} /></section>
</main>)
};

export default App;

