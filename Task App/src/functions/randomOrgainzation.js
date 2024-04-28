const indianCompanies = [
    "Reliance Industries",
    "Tata Consultancy Services",
    "Infosys",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "State Bank of India",
    "Bharti Airtel",
    "Hindustan Unilever",
    "ITC Limited",
    "Wipro",
    "Coal India",
    "Indian Oil Corporation",
    "Larsen & Toubro",
    "Sun Pharmaceuticals",
    "Mahindra & Mahindra",
    "Bajaj Auto",
    "Tech Mahindra",
    "NTPC Limited",
    "Dr. Reddy's Laboratories",
    "Adani Group",
    "JSW Steel",
    "Vedanta Resources",
    "Maruti Suzuki",
    "Reliance Infrastructure",
    "Aditya Birla Group",
    "Tata Motors",
    "ONGC",
    "Bharat Petroleum",
    "GAIL",
  ];
  
 
  export const getRandomCompany = () => {
    const randomIndex = Math.floor(Math.random() * indianCompanies.length);
    return indianCompanies[randomIndex];
  };
  
