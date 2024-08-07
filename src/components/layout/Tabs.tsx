import Link from "next/link"; 
import {  usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function UserTabs({ isAdmin } : { isAdmin: boolean }) {

    const tc = useTranslations("CommonPage");
    const path: string | null = usePathname() 
    return (
        <div className="flex justify-center gap-2 mx-auto mb-4 tabs">
            <Link className={ path === '/profile' ? 'active' : ''} href={'/profile'}> { tc('profile') } </Link>
            {isAdmin && (
                <>
                    <Link className={ path === '/categories' ? 'active' : ''}   href={'/categories'}>  { tc('categories') }   </Link>
                    <Link className={ path === '/menu-items' ||  path === '/menu-items/new' ? 'active' : ''}   href={'/menu-items'}> { tc('menuItems') }   </Link>
                    
                </>
            )}
            <Link className={ path === '/order' ? 'active' : ''} href={'/order'}> { tc('orders') }   </Link>
        </div>
    )
}
