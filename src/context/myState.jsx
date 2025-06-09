import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB, auth } from '../firebase/FirebaseConfig';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [user, setUser] = useState(null); // Mulai dengan null

    // Handle auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                // Jika user login, ambil dari localStorage
                const storedUser = JSON.parse(localStorage.getItem("users"));
                setUser(storedUser);
            } else {
                // Jika logout, reset user
                setUser(null);
                localStorage.removeItem("users");
            }
        });
        return () => unsubscribe();
    }, []);

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, 'data', 'stock', 'products'),
                orderBy('actualPrice')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProductFunction();
    }, []);
    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            user,
            setUser
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState
