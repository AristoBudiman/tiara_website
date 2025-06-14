import { useEffect, useState, useContext } from "react";
import { doc, getDoc, onSnapshot, updateDoc, deleteField, collection,addDoc,serverTimestamp} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import myContext from "../context/myContext";

export default function useCart() {
  const [cart, setCart] = useState({});
  const { user } = useContext(myContext);
  
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

  const deleteItem = async (productId) => {
    if (!user) return;

    const userRef = doc(fireDB, "users", user.uid);
    await updateDoc(userRef, {
      [`cartItems.${productId}`]: deleteField(),
    });

    toast.success("Item removed from cart");
  };

  const checkout = async (total) => {
    if (!user) {
      toast.error("Please login to checkout");
      return { success: false, orderId: null };
    }

    if (Object.keys(cart).length === 0) {
      toast.error("Your cart is empty");
      return { success: false, orderId: null };
    }

    try {
      // Ambil data user
      const userRef = doc(fireDB, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (!userData?.address || !userData?.phone) {
        toast.error("Please complete your address and phone number before checkout.");
        return { success: false, orderId: null };
      }

      const orderRef = collection(fireDB, "orders");
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        items: cart,
        address: userData.address,
        phone: userData.phone,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "sedang diproses",
        total: total
      };

      const docRef = await addDoc(orderRef, orderData);

      // Kosongkan cart
      await updateDoc(userRef, { cartItems: {} });

      toast.success(`Order Created successfully!`);
      return { success: true, orderId: docRef.id };
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order");
      return { success: false, orderId: null };
    }
  };

  // const checkoutWithSnap = async (total) => {
  //   if (!user) {
  //     toast.error("Please login to checkout");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("https://midtrans-server-ujicoba-production.up.railway.app/create-transaction", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         total: total,
  //         email: user.email,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data?.token) {
  //       window.snap.pay(data.token, {
  //         onSuccess: async (result) => {
  //           console.log("Success:", result);
  //           await checkout(total);
  //         },
  //         onPending: () => toast("Waiting for payment..."),
  //         onError: () => toast.error("Payment failed"),
  //         onClose: () => toast("Popup closed"),
  //       });
  //     } else {
  //       toast.error("Failed to get token from server");
  //     }
  //   } catch (err) {
  //     console.error("Checkout error:", err);
  //     toast.error("Checkout failed");
  //   }
  // };

  const checkoutWithSnap = async (total) => {
    if (!user) {
      toast.error("Please login to checkout");
      return;
    }

    try {
      const response = await fetch("https://midtrans-server-ujicoba-production.up.railway.app/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total: total,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data?.token) {
        window.snap.pay(data.token, {
          onSuccess: async (result) => {
            console.log("Payment Success:", result);
            await checkout(total);
          },
          onPending: async (result) => {
            toast("Waiting for payment...");

            // Polling untuk cek status transaksi
            const orderId = result.order_id;
            let attempts = 0;
            const maxAttempts = 5;
            const interval = 3000; // 3 detik

            const checkPaymentStatus = async () => {
              try {
                const res = await fetch(`https://midtrans-server-ujicoba-production.up.railway.app/create-transaction/${orderId}`);
                const statusData = await res.json();

                console.log("Status check:", statusData);

                if (statusData.transaction_status === "settlement" || statusData.transaction_status === "capture") {
                  toast.success("Payment confirmed!");
                  await checkout(total);
                } else if (attempts < maxAttempts) {
                  attempts++;
                  setTimeout(checkPaymentStatus, interval);
                } else {
                  toast("Payment still pending. Please complete the payment.");
                }
              } catch (error) {
                console.error("Error checking payment status:", error);
                toast.error("Failed to check payment status");
              }
            };

            checkPaymentStatus();
          },
          onError: (err) => {
            toast.error("Payment failed");
            console.error("Payment Error:", err);
          },
          onClose: () => {
            toast("Payment popup closed");
          },
        });
      } else {
        toast.error("Failed to get token from server");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed");
    }
  };

  return { cart, addToCart, removeFromCart, deleteItem, checkout, checkoutWithSnap};
}