export default function UserContextProvider({ children }) {
    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
}