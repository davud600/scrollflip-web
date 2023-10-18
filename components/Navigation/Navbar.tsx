import WishlistButton from '../Wishlist/WishlistButton'
import AuthButtons from './AuthButtons'
import DesktopNavbar from './NavbarMenu'
import HeaderLogo from './NavbarLogo'
import SearchBar from './SearchBar'
import MobileSearchButton from './MobileSearchButton'

export default function Navbar() {
  return (
    <div className="fixed top-0 z-10 flex h-16 w-screen items-center justify-between border border-b bg-white md:justify-normal">
      <div className="w-[5%] md:w-[30%]"></div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <DesktopNavbar />
          <HeaderLogo />
        </div>
        <div
          className="flex items-center justify-start gap-7"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: 0,
            gap: 30,
          }}
        >
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <div className="block md:hidden">
            <MobileSearchButton />
          </div>
          <div className="mr-2 md:mr-0">
            <WishlistButton />
          </div>
          <div className="hidden md:block">
            <AuthButtons />
          </div>
        </div>
      </div>

      <div className="w-[5%] md:w-[30%]"></div>
    </div>
  )
}
