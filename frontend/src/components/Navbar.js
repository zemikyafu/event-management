import '../components/Navbar.css'

function Navbar()
{
    return(
        
        <ul className="nav-bar-list">
            <li className='nav-bar-list-item'>
           <a className="active" href="/">Home </a>  
            </li>
            
            <li className='nav-bar-list-item'>
            <a   href="/events">Events </a>  
            </li>
            <li className='nav-bar-list-item'>
            <a  href="#"> Profile</a>   
            </li>
        </ul>
      
         
    )
}
export default Navbar