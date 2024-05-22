import React from "react";
import "./ShopFlowers.css"; // Import CSS file
// Import flower images
import flowerImage1 from "../images/RoseBouquet.jpeg";
import flowerImage2 from "../images/TulipBouquet.jpeg";
import flowerImage3 from "../images/SunflowerBouquet.jpeg";
import flowerImage4 from "../images/LilyBouquet.jpeg";
import flowerImage5 from "../images/DaisyBouquet.jpeg";
import flowerImage6 from "../images/OrchidBouquet.jpeg";
import flowerImage7 from "../images/MixedFlowerBouquet.jpeg";
import flowerImage8 from "../images/CarnationBouquet.jpeg";
import flowerImage9 from "../images/PeonyBouquet.jpeg";
import flowerImage10 from "../images/HydrangeaBouquet.jpeg";
import flowerImage11 from "../images/Baby'sBreathBouquet.jpeg";
import flowerImage12 from "../images/WildflowerBouquet.jpeg";
import flowerImage13 from "../images/CallaLilyBouquet.jpeg";

const ShopFlowers = () => {
  // Array containing flower items with details
  const flowerItems = [
    {
      name: "Rose Bouquet",
      description: "A beautiful bouquet of white roses.",
      price: "29.99",
      image: flowerImage1,
    },
    {
      name: "Tulip Bouquet",
      description: "A vibrant bouquet of assorted tulips.",
      price: "24.99",
      image: flowerImage2,
    },
    {
      name: "Sunflower Bouquet",
      description: "A cheerful bouquet of sunflowers.",
      price: "19.99",
      image: flowerImage3,
    },
    {
      name: "Lily Bouquet",
      description: "A fragrant bouquet of lilies.",
      price: "27.99",
      image: flowerImage4,
    },
    {
      name: "Daisy Bouquet",
      description: "A charming bouquet of daisies.",
      price: "22.99",
      image: flowerImage5,
    },
    {
      name: "Orchid Bouquet",
      description: "An elegant bouquet of orchids.",
      price: "32.99",
      image: flowerImage6,
    },
    {
      name: "Mixed Flower Bouquet",
      description: "A mixed bouquet of various flowers.",
      price: "26.99",
      image: flowerImage7,
    },
    {
      name: "Carnation Bouquet",
      description: "A classic bouquet of carnations.",
      price: "21.99",
      image: flowerImage8,
    },
    {
      name: "Peony Bouquet",
      description: "A luxurious bouquet of peonies.",
      price: "34.99",
      image: flowerImage9,
    },
    {
      name: "Hydrangea Bouquet",
      description: "A stunning bouquet of hydrangeas.",
      price: "30.99",
      image: flowerImage10,
    },
    {
      name: " Baby's Breath Bouquet",
      description: "A delicate bouquet of baby's breath.",
      price: "18.99",
      image: flowerImage11,
    },
    {
      name: "Wildflower Bouquet",
      description: "A rustic bouquet of wildflowers.",
      price: "23.99",
      image: flowerImage12,
    },
    {
      name: "Calla Lily Bouquet",
      description: "An elegant bouquet of calla lilies.",
      price: "28.99",
      image: flowerImage13,
    },
  ];

  // Function to handle adding item to cart
  const handleAddToCart = (itemName) => {
    // logic needed
    console.log(`Added ${itemName} to cart`);
  };

  return (
    <div>
      <div className="hero-section">
        <h1>SHOP ALL FLOWERS</h1>
        <div className="flower-container">
          {flowerItems.map((item, index) => (
            <div key={index} className="flower-item">
              <img src={item.image} alt={item.name} />
              <div className="flower-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <button onClick={() => handleAddToCart(item.name)}>
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopFlowers;
