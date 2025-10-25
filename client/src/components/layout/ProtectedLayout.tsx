import { Outlet, Link } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

const ProtectedLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="z-100 bg-black">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold">
            EsteBanquito
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <a href="/banco">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Mi Banco
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/transacciones">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Transacciones
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a href="/soporte">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Soporte
                  </NavigationMenuLink>
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/">Cerrar Sesión</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout
