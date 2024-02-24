const AuthLayout = ({children} : { children: React.ReactNode }) => {
    return ( 
       <>
          <main className="h-full">
            {children}  
          </main>         
       </>
    )
}
 
export default AuthLayout 