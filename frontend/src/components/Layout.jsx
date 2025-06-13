import NavBar from './NavBar/NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div>
        <NavBar  />
      </div>
      
        
      <div style={{ paddingLeft : '5%' , paddingRight : '5%'}}>
        <main><Outlet /></main>
      </div>
      <Footer />
      
    </>
  );
}