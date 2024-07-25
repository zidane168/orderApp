import Link from "next/link"; 
import {  usePathname } from 'next/navigation'

export default function UserTabs({ isAdmin } : { isAdmin: boolean }) {
    const path: string = usePathname()   
    return (
        <div className="flex justify-center gap-2 mx-auto mb-4 tabs">
            <Link className={ path === '/profile' ? 'active' : ''} href={'/profile'}> Profile </Link>
            {isAdmin && (
                <>
                    <Link className={ path === '/categories' ? 'active' : ''}   href={'/categories'}> Categories </Link>
                    <Link className={ path === '/menu-items' ||  path === '/menu-items/new' ? 'active' : ''}   href={'/menu-items'}> Menu Items </Link>
                    <Link className={ path === '/users' ? 'active' : ''}        href={'/users'}> Users </Link>
                </>
            )}
        </div>
    )
}
