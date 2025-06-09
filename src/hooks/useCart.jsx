import { useEffect, useState, useContext } from "react";
import { doc, onSnapshot, updateDoc, deleteField } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import myContext from "../context/myContext";

export default function useCart() {
  const [cart, setCart] = useState({});
  const { user } = useContext(myContext); // Gunakan user dari context

  // Listen perubahan cart dari Firestore
  useEffect(() => {
    if (!user) {
      setCart({}); // jika logout, kosongkan cart
      return;
    }

    const userRef = doc(fireDB, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      const data = docSnap.data();
      setCart(data?.cartItems || {});
    });

    return () => unsubscribe();
  }, [user]);

  const addToCart = async (productId) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    const userRef = doc(fireDB, "users", user.uid);
    const currentQty = cart[productId] || 0;

    await updateDoc(userRef, {
      [`cartItems.${productId}`]: currentQty + 1,
    });

    toast.success("Item added to cart");
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    const userRef = doc(fireDB, "users", user.uid);
    const currentQty = cart[productId] || 0;

    if (currentQty <= 1) {
      await updateDoc(userRef, {
        [`cartItems.${productId}`]: deleteField(),
      });
    } else {
      await updateDoc(userRef, {
        [`cartItems.${productId}`]: currentQty - 1,
      });
    }

    toast.success("Item removed from cart");
  };

  return { cart, addToCart, removeFromCart };
}