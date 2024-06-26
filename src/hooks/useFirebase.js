import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    const auth = getAuth();

    // email password registration
    const registerUser = (email, password, name, history, role, phoneNo, venues, profileImageLink, address) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);

                // save user to the database
                if (role === 'customer') {
                    saveUser(email, name, role, phoneNo, [], profileImageLink, address);
                }
                if (role === 'owner') {
                    saveUser(email, name, role, phoneNo, venues, profileImageLink, address);
                }

                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history('/');
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    };


    // email password login 
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                // history(destination);
                history("/home");
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }



    // google sign in
    const signInUsingGooogle = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);
            })
            .catch(error => {
            })
            .finally(() => setIsLoading(false));
    }



    // log out
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    };


    // observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);




    const saveUser = (email, name, role, phoneNo, venues, profileImageLink, address) => {
        if (role === 'customer') {
            const bookings = [];
            const user = { email, name, role, phoneNo, bookings, profileImageLink, address };
            fetch('https://event-horizon-8f3s.onrender.com/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then()
        }

        if (role === 'owner') {
            const user = { email, name, role, phoneNo, venues, profileImageLink, address };
            fetch('https://event-horizon-8f3s.onrender.com/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then()
        }

    }


    return {
        user,
        isLoading,
        registerUser,
        saveUser,
        loginUser,
        signInUsingGooogle,
        logOut,
        authError
    }

}


export default useFirebase;