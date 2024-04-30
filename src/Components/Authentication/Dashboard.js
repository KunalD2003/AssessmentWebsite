import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Dashboard(props) {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const displayName = user.email;
                console.log("User Display Name:", displayName);
                setUserName(displayName);
            } else {
                // User is signed out
                setUserName(null);
            }
        });

        return () => unsubscribe(); // Clean up the subscription
    }, []);

    return (
        <>
            <h1>Welcome to Dashboard Page</h1>
            <br/>
            {userName && <h3>Hello, {userName}!</h3>}
        </>
    );
}

export default Dashboard;
