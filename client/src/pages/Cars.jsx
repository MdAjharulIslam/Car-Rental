// import React, { useEffect, useState } from "react";
// import Title from "../components/Title";
// import { assets, dummyCarData } from "../assets/assets";
// import CarCard from "../components/CarCard";
// import { useSearchParams } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import { motion } from "motion/react";

// const Cars = () => {
//   //getting search params from url

//   const [searchParams] = useSearchParams();

//   const pickupLocation = searchParams.get("pickupLocation");
//   const pickupDate = searchParams.get("pickupDate");
//   const returnDate = searchParams.get("returnDate");

//   const { cars, axios } = useAppContext();

//   const [input, setInput] = useState("");

//   const isSearchData = pickupLocation && pickupDate && returnDate;

//   const [filteredCars, setFilteredCars] = useState(cars);

//   const applyFilter = () => {
//     if (input === "") {
//       setFilteredCars(cars);
//       return null;
//     }

//     const filtered = cars
//       .slice()
//       .filter(
//         (car) =>
//           car.brand.toLowerCase().includes(input.toLowerCase()) ||
//           car.model.toLowerCase().includes(input.toLowerCase()) ||
//           car.category.toLowerCase().includes(input.toLowerCase()) ||
//           car.transmission.toLowerCase().includes(input.toLowerCase())
//       );
//     setFilteredCars(filtered);
//   };

//   const searchCarAvailability = async () => {
//     try {
//       const { data } = await axios.post("/api/bookings/check-availability", {
//         location: pickupLocation,
//         pickupDate,
//         returnDate,
//       });

//       if (data.success) {
//         setFilteredCars(data.availableCars);
//         if (data.availableCars.length === 0) {
//           toast("No cars available");
//         }
//         return null;
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   // Run search availability if search data exists
//   useEffect(() => {
//     if (isSearchData) {
//       searchCarAvailability();
//     } else {
//       // If no search data, show all cars initially
//       setFilteredCars(cars);
//     }
//   }, [isSearchData, cars]);

//   // Apply input filter when input or cars change
//   useEffect(() => {
//     applyFilter();
//   }, [input, cars]);

//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ ease: "easeOut", duration: 0.6 }}
//         className="flex flex-col items-center py-20 bg-light max-md:px-4"
//       >
//         <Title
//           title="Available Cars"
//           subTitle="Browse our selection of premium vehicles available for your next adventure"
//         />
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow"
//         >
//           <img src={assets.search_icon} alt="Search" className="w-5 h-5 mr-2" />
//           <input
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//             type="text"
//             placeholder="Search by make, model, or features"
//             className="flex-1 outline-none"
//           />
//           <img src={assets.filter_icon} alt="Filter" className="w-5 h-5 ml-2" />
//         </motion.div>
//       </motion.div>

//       {/* Car list or filtered results will go here */}

//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.6, duration: 0.5 }}
//         className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
//       >
//         <p className="text-gay-500 xl:px-20 max-w-7xl mx-auto">
//           Showing {filteredCars.length} Cars
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
//           {filteredCars.map((car, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1, duration: 0.4 }}
//             >
//               <CarCard car={car} />
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Cars;
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios, loadingCars } = useAppContext();

  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const applyFilter = () => {
    if (!input.trim()) {
      setFilteredCars(cars);
      return;
    }

    const filtered = cars.filter(
      (car) =>
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) toast("No cars available");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while checking availability");
    }
  };

  useEffect(() => {
    if (isSearchData) searchCarAvailability();
    else setFilteredCars(cars);
  }, [isSearchData, cars]);

  useEffect(() => {
    applyFilter();
  }, [input, cars]);

  // ✅ Show cached or fetched cars instantly
  if (loadingCars)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Loading cars...</p>
      </div>
    );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.6 }}
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow"
        >
          <img src={assets.search_icon} alt="Search" className="w-5 h-5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="flex-1 outline-none"
          />
          <img src={assets.filter_icon} alt="Filter" className="w-5 h-5 ml-2" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
      >
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
