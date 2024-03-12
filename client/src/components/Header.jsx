import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between bg-slate-800 p-3 px-20'>
        <div className='logo-container'>
            <img src="#" alt="LOGO" />
        </div>
        <nav className='flex  items-center gap-5 ml-40 after:'>
            <Link className='text-white font-semibold' to='/'>Home</Link>
            <Link  className='text-white font-semibold' to='/about'>About</Link>
            <Link  className='text-white font-semibold' to='/contact'>Contact</Link>
        </nav>
        <div className='mx-0 '> 
            <form action="" className='flex gap-2'>
                <input className='rounded-md border-0 pl-4' type="search" name="search" id="" placeholder='search' />
                <button className='bg-sky-500 hover:bg-sky-700 rounded-md p-1' type="submit">Search</button>
            </form>
        </div>
    </header>
  )
}

export default Header