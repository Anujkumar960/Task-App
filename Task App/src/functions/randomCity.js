const indianLocations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Visakhapatnam",
    "Indore",
    "Thane",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Coimbatore",
    "Agra",
    "Madurai",
    "Nashik",
    "Vijayawada",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Varanasi",
  ];
  

  export const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * indianLocations.length);
    return indianLocations[randomIndex];
  };
  

  