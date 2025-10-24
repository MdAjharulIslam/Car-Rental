import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  // ✅ Fetch all cars instantly (public endpoint)
  const fetchCars = async () => {
    try {
      setLoadingCars(true);
      const { data } = await axios.get("/api/user/cars", { timeout: 10000 });
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message || "Failed to fetch cars");
      }
    } catch (error) {
      console.error("Car fetch error:", error);
      toast.error("Unable to load cars. Please try again.");
    } finally {
      setLoadingCars(false);
    }
  };

  // ✅ Fetch logged-in user (only if token is available)
  const fetchUser = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        logout();
      }
    } catch (error) {
      console.error("User fetch error:", error);
      logout();
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("You have been logged out");
    navigate("/");
  };

  // ✅ Retrieve token once on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = storedToken;
    }
    fetchCars(); // fetch cars immediately for everyone
  }, []);

  // ✅ Fetch user when token changes
  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  // ✅ Cache cars in localStorage to avoid refetch delay
  useEffect(() => {
    if (cars.length > 0) {
      localStorage.setItem("cachedCars", JSON.stringify(cars));
    }
  }, [cars]);

  // ✅ Load cached cars instantly on startup
  useEffect(() => {
    const cached = localStorage.getItem("cachedCars");
    if (cached) {
      setCars(JSON.parse(cached));
      setLoadingCars(false);
    }
  }, []);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    loadingCars,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
