import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB, auth } from '../firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore'; 

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [user, setUser] = useState(null); // Mulai dengan null
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        let unsubscribeUser = null;

        const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
            const docRef = doc(fireDB, "users", firebaseUser.uid);
            unsubscribeUser = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                const userData = docSnap.data();
                setUser({ ...userData });
                localStorage.setItem("users", JSON.stringify(userData));
                } else {
                setUser(null);
                localStorage.removeItem("users");
                }
            });
            } else {
            setUser(null);
            localStorage.removeItem("users");
            if (unsubscribeUser) unsubscribeUser();
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUser) unsubscribeUser();
        };
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
    const getAllOrderFunction = async () => {
    setLoading(true);
    try {
        const q = query(collection(fireDB, "orders"), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
            const orderData = doc.data();
            orderArray.push({ 
            ...orderData,
            id: doc.id,
            items: orderData.items || {}  
            });
        });
        setGetAllOrder(orderArray);
        setLoading(false);
        });
        return () => unsubscribe();
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
    };

    const getAllUsersFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "users"));
            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                const usersArray = [];
                QuerySnapshot.forEach((doc) => {
                    usersArray.push({ ...doc.data(), id: doc.id });
                });
                setAllUsers(usersArray);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log("Error fetching users:", error);
            setLoading(false);
        }
    };
    

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUsersFunction();
    }, []);
    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            user,
            setUser,
            getAllOrder,
            allUsers
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState
