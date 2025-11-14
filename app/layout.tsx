
import './globals.css'
import Footer from '@/components/Footer'
export const metadata = {title:'OnlyVet',description:'OnlyVet Clean'}
export default function RootLayout({children}){return <html lang='ru'><body><main>{children}</main><Footer/></body></html>}
